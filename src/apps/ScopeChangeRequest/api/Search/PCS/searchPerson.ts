import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { Person } from '../../../types/ProCoSys/person';

export const searchPerson = async (
    searchString: string,
    plantId: string,
    procosysClient: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const uri = 'api/Person/PersonSearch';
    const queryParameters = `plantId=${encodeURIComponent(
        plantId
    )}&searchString=${encodeURIComponent(searchString)}&numberOfRows=10&api-version=4.1`;
    const url = `${uri}?${queryParameters}`;
    await procosysClient
        .fetch(url, { signal })
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
