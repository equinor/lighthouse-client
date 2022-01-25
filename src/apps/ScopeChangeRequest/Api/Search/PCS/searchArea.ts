import { BaseClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { Area } from './Types/area';

export const searchAreas = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&savedSearchId=106102&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${baseUrl}/${uri}?${queryParameters}`;

    const search: PCSStructure[] = [
        {
            Key: 'LibraryCode',
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
                    label: `AREA_${x.Code} - ${x.Description}`,
                    value: x.Code,
                    type: 'area',
                    searchValue: x.Code,
                    object: x,
                });
            });
        });
    return selectOptions || [];
};
