import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { Area } from './Types/area';
import { HttpClient } from '../../../../../Core/httpClient/src';

export const searchAreas = async (
    searchString: string,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 103741;
    const searchIdProd = 106102;

    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${searchIdProd}&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

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
