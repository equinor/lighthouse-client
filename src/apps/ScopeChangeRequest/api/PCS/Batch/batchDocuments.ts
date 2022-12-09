import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { transformIsoDate } from '../../../Components/Workflow/Utils/dateFormatting';
import { throwOnError } from '../../../functions/throwError';
import { Document } from '../../../types/STID/document';
import { TypedSelectOption } from '../../Search/searchType';

export const fetchBatchDocuments = async (
    documentNos: string[],
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const { STID } = httpClient();

    const url = `/JCA/documents?includeOfP=true`;
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(documentNos),
        signal: signal,
    };

    const res = await STID.fetch(url, requestOptions);

    if (res.status === 401 || res.status === 403) {
        throw 'User has no access';
    }
    throwOnError(res);

    return (await res.json()).map(
        (x: Document): TypedSelectOption => ({
            label: `${x.docNo} - ${x.docTitle}`,
            value: x.docNo,
            type: 'document',
            searchValue: x.docNo,
            object: x,
            metadata: `Revision ${x.revNo} | Rev date ${
                x.revDate && transformIsoDate(x.revDate)
            } | Reason for issue ${x.reasonForIssue !== null ? x.reasonForIssue : 'NA'}`,
        })
    );
};
