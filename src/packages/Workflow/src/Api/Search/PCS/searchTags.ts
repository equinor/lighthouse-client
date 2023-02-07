import { HttpClient } from '@equinor/http-client';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { SearchTag } from '../../../Types/ProCoSys/Tag';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './searchStructure';

const SEARCH_ID_DEV = 105220;
const SEARCH_ID_PROD = 105793;
const URI = 'api/Search';

export const searchTags = async (
    searchString: string,
    plantId: string,
    procosysClient: HttpClient,
    abortSignal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const queryParameters = `plantId=${encodeURIComponent(plantId)}&savedSearchId=${
        isProduction() ? SEARCH_ID_PROD : SEARCH_ID_DEV
    }&currentPage=0&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${URI}?${queryParameters}`;

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
            acc[maybeIndex].duplicateObjects?.push(curr);
        } else {
            acc.push({
                label: `${curr.TagNo} - ${curr.Description}`,
                value: curr.TagNo,
                type: 'tag',
                searchValue: curr.TagNo,
                object: curr,
                duplicateObjects: [curr],
                metadata: `Comm pkg: ${
                    curr.McPkgsThroughScope__CommPkg__CommPkgNo ?? 'none'
                } | Tag register: ${curr.Register__Id} `,
            });
        }

        return acc;
    }, [] as TypedSelectOption[]);
    return mappedData || [];
};
