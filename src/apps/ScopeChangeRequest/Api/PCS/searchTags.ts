import { BaseClient } from '@equinor/http-client';

interface SelectOption {
    value: string;
    label: string;
}

interface Tag {
    TagNo: string;
    Id: string;
    Description: string;
}

export const searchTags = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    try {
        const baseUrl = 'https://procosyswebapi.equinor.com/api';
        const uri = 'Tag/Search';
        const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&startsWithTagNo=${encodeURIComponent(
            searchString
        )}&includeClosedProjects=false&currentPage=0&itemsPerPage=7&api-version=4.1`;

        const url = `${baseUrl}/${uri}?${queryParameters}`;

        await procosysClient
            .fetch(url)
            .then((response) => response.json())
            .then((data: Tag[]) => {
                data['Items'].forEach((x: Tag) => {
                    selectOptions.push({ label: `${x.TagNo} - ${x.Description}`, value: x.TagNo });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
