import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { System } from './Types/system';

export const searchSystem = async (
    searchString: string,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

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
        .fetch(
            `https://procosyswebapi.equinor.com/api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=105667&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
            requestOptions
        )
        .then((response) => response.json())
        .then((data) => {
            data.map((x: System) => {
                selectOptions.push({
                    label: `${x.Code} - ${x.Description}`,
                    value: x.Code,
                    searchValue: x.Code,
                    type: 'system',
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
