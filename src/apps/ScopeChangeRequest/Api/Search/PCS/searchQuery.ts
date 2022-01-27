import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { Query } from './Types/query';
import { PCSStructure } from './Types/searchStructure';

export const searchQueryOrigin = async (
    searchString: string,
    client: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 103743;
    const searchIdProd = 105670;

    const search: PCSStructure[] = [
        {
            Key: 'DocumentDocumentNo',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
    };
    try {
        await client
            .fetch(
                `https://procosyswebapi.equinor.com/api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${searchIdProd}&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: Query) => {
                    selectOptions.push({
                        label: x.DocumentNo,
                        value: x.DocumentNo,
                        type: 'query',
                        searchValue: x.DocumentNo,
                        object: x,
                    });
                });
            });
    } catch (e) {
        console.warn(e);
    }
    return selectOptions || [];
};
