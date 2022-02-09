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
    const searchIdProd = 1;

    const search: PCSStructure[] = [
        {
            Key: 'LibraryFunctionalRoleName',
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
                        label: x.Description,
                        value: x.Id.toString(),
                        type: 'functionalRole',
                        searchValue: x.Description,
                        object: x,
                    });
                });
            });
    } catch (e) {
        console.warn(e);
    }
    return selectOptions || [];
};
