import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { Document } from './Types/Document';

export const searchDocuments = async (
    searchString: string,
    stidClient: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const baseUrl = 'https://stidapi.equinor.com';
    const uri = 'JCA/documents';
    const queryParameters = `docNo=${encodeURI(searchString)}&skip=0&take=50&noContentAs200=false`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    await stidClient
        .fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Document) => {
                selectOptions.push({
                    label: `${x.docNo} - ${x.docTitle}`,
                    value: x.docNo,
                    type: 'document',
                    searchValue: x.docNo,
                });
            });
        });

    return selectOptions || [];
};
