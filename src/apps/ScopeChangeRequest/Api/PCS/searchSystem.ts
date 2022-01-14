import { BaseClient } from '@equinor/http-client';

interface SelectOption {
    value: string;
    label: string;
}

interface PCSStructure {
    Key: string;
    Value: string;
}

interface System {
    Description: string;
    Id: string;
    Path: string;
}

export const searchSystem = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

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
    try {
        await procosysClient
            .fetch(
                `https://procosyswebapi.equinor.com/api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=102704&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: System) => {
                    selectOptions.push({ label: `${x.Path} - ${x.Description}`, value: x.Path });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
