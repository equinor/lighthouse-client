import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { Area } from './Types/area';
import { HttpClient } from '../../../../../Core/httpClient/src';
import { isProduction } from '../../../../../Core/Client/Functions';

export const searchDiscipline = async (
    searchString: string,
    procosysClient: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105218;
    const searchIdProd = 106105;

    const uri = 'api/Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${
        isProduction() ? searchIdProd : searchIdDev
    }&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${uri}?${queryParameters}`;

    const search: PCSStructure[] = [
        {
            Key: 'LibraryDescription',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
        signal,
    };

    await procosysClient
        .fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data: Area[]) => {
            data.forEach((x: Area) => {
                selectOptions.push({
                    label: `DISC_${x.Code} - ${x.Description}`,
                    value: x.Code,
                    type: 'discipline',
                    searchValue: x.Code,
                    object: x,
                });
            });
        });
    return selectOptions || [];
};
