import { isProduction } from '../../../../../Core/Client/Functions';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { FunctionalRole } from './Types/functionalRole';
import { HttpClient } from '../../../../../Core/httpClient/src';

export const searchFunctionalRole = async (
    searchString: string,
    client: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105221;
    const searchIdProd = 106828;

    const search: PCSStructure[] = [
        {
            Key: 'LibraryCode',
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
                `api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${isProduction() ? searchIdProd : searchIdDev
                }&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: FunctionalRole) => {
                    selectOptions.push({
                        label: x.Code,
                        value: x.Code,
                        type: 'functionalRole',
                        searchValue: x.Code,
                        object: x,
                    });
                });
            });
    } catch (e) {
        console.warn(e);
    }
    return selectOptions || [];
};
