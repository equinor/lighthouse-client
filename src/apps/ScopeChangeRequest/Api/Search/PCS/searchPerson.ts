import { BaseClient } from '../../../../../../packages/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { Person } from './Types/person';

export const searchPerson = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'Person/PersonSearch';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&searchString=${encodeURIComponent(
        searchString
    )}&numberOfRows=10&api-version=4.1`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    await procosysClient
        .fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Person) => {
                selectOptions.push({
                    label: `${x.FirstName} ${x.LastName} - ${x.Email}`,
                    value: x.AzureOid,
                    type: 'person',
                    searchValue: `${x.FirstName} ${x.LastName}`,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
