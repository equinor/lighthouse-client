import { HttpClient } from '@equinor/http-client';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { SearchTag } from '../../../Types/ProCoSys/Tag';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './searchStructure';

export const searchTags = async (
    searchString: string,
    plantId: string,
    procosysClient: HttpClient,
    abortSignal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105220;
    const searchIdProd = 105793;

    const uri = 'api/Search';
    const queryParameters = `plantId=${encodeURIComponent(plantId)}&savedSearchId=${
        isProduction() ? searchIdProd : searchIdDev
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
    const res = await procosysClient.fetch(url, requestOptions);
    const resJson = (await res.json()) as SearchTag[];
    const mappedData = resJson.reduce((acc, curr) => {
        const maybeIndex = acc.findIndex((data) => data.value === curr.TagNo);
        if (maybeIndex > -1) {
            acc[maybeIndex].temp?.push(curr);
        } else {
            acc.push({
                label: `${curr.TagNo} - ${curr.Description}`,
                value: curr.TagNo,
                type: 'tag',
                searchValue: curr.TagNo,
                object: curr,
                temp: [curr],
                metadata: `Comm pkg: ${
                    curr.McPkgsThroughScope__CommPkg__CommPkgNo ?? 'none'
                } | Tag register: ${curr.Register__Id} `,
            });
        }

        return acc;
    }, [] as TypedSelectOption[]);
    console.log('Mapped Data', mappedData);
    // await procosysClient
    //     .fetch(url, requestOptions)
    //     .then((response) => response.json())
    //     .then((data: SearchTag[]) => {
    //         data.forEach((x: SearchTag) => {
    //             selectOptions.push({
    //                 label: `${x.TagNo} - ${x.Description}`,
    //                 value: x.TagNo,
    //                 type: 'tag',
    //                 searchValue: x.TagNo,
    //                 object: x,
    //                 metadata: `Comm pkg: ${
    //                     x.McPkgsThroughScope__CommPkg__CommPkgNo ?? 'none'
    //                 } | Tag register: ${x.Register__Id} `,
    //             });
    //         });
    //     });
    return mappedData || [];
};
