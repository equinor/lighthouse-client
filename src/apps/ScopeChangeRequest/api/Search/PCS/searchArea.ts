import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './searchStructure';
import { Area } from '../../../types/ProCoSys/area';
import { HttpClient } from '../../../../../Core/httpClient/src';
import { isProduction } from '../../../../../Core/Client/Functions';

export const searchAreas = async (
    searchString: string,
    plantId: string,
    procosysClient: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105219;
    const searchIdProd = 106102;

    const uri = 'api/Search';
    const queryParameters = `plantId=${encodeURIComponent(plantId)}&savedSearchId=${isProduction() ? searchIdProd : searchIdDev
        }&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${uri}?${queryParameters}`;

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

    await procosysClient
        .fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data: Area[]) => {
            data.forEach((x: Area) => {
                selectOptions.push({
                    label: `${x.Code} - ${x.Description}`,
                    value: x.Code,
                    type: 'area',
                    searchValue: x.Code,
                    object: x,
                });
            });
        });
    return selectOptions || [];
};
