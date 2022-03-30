import { HttpClient } from '@equinor/http-client';
import { isProduction } from '../../../../../Core/Client/Functions';
import { TypedSelectOption } from '../searchType';
import { Query } from '../../../Types/ProCoSys/query';
import { PCSStructure } from './searchStructure';

export const searchQueryOrigin = async (
    searchString: string,
    plantId: string,
    client: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105215;
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
        signal,
    };
    try {
        await client
            .fetch(
                `api/Search?plantId=${encodeURIComponent(plantId)}&savedSearchId=${isProduction() ? searchIdProd : searchIdDev
                }&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: Query) => {
                    selectOptions.push({
                        label: x.DocumentNo,
                        value: x.DocumentNo,
                        type: 'Query',
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
