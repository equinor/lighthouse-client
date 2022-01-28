import { HttpClient } from '@equinor/http-client';
import { isProduction } from '../../../../../Core/Client/Functions';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './Types/searchStructure';
import { Tag } from './Types/tag';

export const searchTags = async (
    searchString: string,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdProd = 105793;
    const searchIdDev = 103745;

    const uri = 'api/Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${isProduction() ? searchIdProd : searchIdDev
        }&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${uri}?${queryParameters}`;

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
