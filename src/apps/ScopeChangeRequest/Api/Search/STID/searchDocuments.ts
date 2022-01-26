import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { Document } from '../../STID/Types/Document';
import { TypedSelectOption } from '../searchType';

export const searchDocuments = async (searchString: string): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const { STID } = httpClient();
    //Test https://stidapitest.equinor.com
    const baseUrl = 'https://stidapi.equinor.com';
    STID.setBaseUrl(baseUrl);
    const uri = '/JCA/documents';
    const queryParameters = `docNo=${encodeURI(searchString)}&skip=0&take=50&noContentAs200=true`;
    const url = `${uri}?${queryParameters}`;
    await STID.fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Document) => {
                selectOptions.push({
                    label: `DOC_${x.docNo}`,
                    value: x.docNo,
                    type: 'document',
                    searchValue: x.docNo,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
