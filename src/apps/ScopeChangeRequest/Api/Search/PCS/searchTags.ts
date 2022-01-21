import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { Tag } from './Types/tag';

export const searchTags = async (
    searchString: string,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&savedSearchId=105793&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${baseUrl}/${uri}?${queryParameters}`;

    const search: PCSStructure[] = [
        {
            Key: 'TagTagNo',
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
        .then((data: Tag[]) => {
            data.forEach((x: Tag) => {
                selectOptions.push({
                    label: `TAG_${x.TagNo} - ${x.Description}`,
                    value: x.TagNo,
                    type: 'tag',
                    searchValue: x.TagNo,
                    object: x,
                });
            });
        });
    return selectOptions || [];
};
