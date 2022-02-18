import { HttpClient } from '@equinor/http-client';
import { isProduction } from '../../../../../Core/Client/Functions';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './searchStructure';
import { SearchTag } from '../../../Types/ProCoSys/Tag';

export const searchTags = async (
    searchString: string,
    procosysClient: HttpClient,
    abortSignal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105220;
    const searchIdProd = 105793;

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
        signal: abortSignal,
    };

    await procosysClient
        .fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data: SearchTag[]) => {
            data.forEach((x: SearchTag) => {
                selectOptions.push({
                    label: `${x.TagNo} - ${x.Description}`,
                    value: x.TagNo,
                    type: 'tag',
                    searchValue: x.TagNo,
                    object: x,
                });
            });
        });
    return selectOptions || [];
};
