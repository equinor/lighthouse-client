import { BaseClient } from '@equinor/http-client';
import { Document } from '../../STID/Types/Document';
import { TypedSelectOption } from '../searchType';

export const searchDocuments = async (
    searchString: string,
    stidClient: BaseClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    //Test https://stidapitest.equinor.com
    const baseUrl = 'https://stidapitest.equinor.com';
    const uri = 'JCA/documents';
    const queryParameters = `docNo=${encodeURI(searchString)}&skip=0&take=7&noContentAs200=true`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    await stidClient
        .fetch(url)
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
