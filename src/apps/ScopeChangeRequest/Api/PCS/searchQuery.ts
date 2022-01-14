import { BaseClient } from '../../../../../packages/httpClient/src';

interface SelectOption {
    value: string;
    label: string;
}

interface PCSStructure {
    Key: string;
    Value: string;
}

interface Query {
    DocumentNo: string;
    Id: number;
    DocumentType__Code?: any;
    Title: string;
}

export const searchQueryOrigin = async (
    searchString: string,
    client: BaseClient
): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    const search: PCSStructure[] = [
        {
            Key: 'DocumentDocumentNo',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
    };
    try {
        await client
            .fetch(
                `https://procosyswebapi.equinor.com/api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=105670&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: Query) => {
                    selectOptions.push({ label: x.DocumentNo, value: x.DocumentNo });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
