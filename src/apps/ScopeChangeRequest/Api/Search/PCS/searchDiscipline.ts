import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { Area } from './Types/area';
import { HttpClient } from '../../../../../Core/httpClient/src';

export const searchDiscipline = async (
    searchString: string,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&savedSearchId=106105&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${baseUrl}/${uri}?${queryParameters}`;

    const search: PCSStructure[] = [
        {
            Key: 'LibraryDescription',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
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
