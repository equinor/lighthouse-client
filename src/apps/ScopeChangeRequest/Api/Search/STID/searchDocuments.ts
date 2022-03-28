import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { Document } from '../../../Types/STID/Document';
import { TypedSelectOption } from '../searchType';

export const searchDocuments = async (
    searchString: string,
    facilityId: string,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const { STID } = httpClient();

    const uri = `/${facilityId}/documents`;
    const queryParameters = `docNo=${encodeURI(searchString)}&skip=0&take=30&noContentAs200=true`;
    const url = `${uri}?${queryParameters}`;
    await STID.fetch(url, { signal })
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Document) => {
                selectOptions.push({
                    label: `DOC_${x.docNo} - ${x.docTitle}`,
                    value: x.docNo,
                    type: 'document',
                    searchValue: x.docNo,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
