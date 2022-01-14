import { BaseClient } from '../../../../../packages/httpClient/src';
interface SelectOption {
    value: string;
    label: string;
}

interface Person {
    AzureOid: string;
    Username: string;
    FirstName: string;
    LastName: string;
    Email: string;
}

export const searchPerson = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    try {
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
                    });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
