import { httpClient, isProduction } from '@equinor/lighthouse-portal-client';
import { SearchTag } from '../../../Types/ProCoSys/Tag';
import { TypedSelectOption } from '../../Search/searchType';
const generateRequestOptions = (tagNos: string[], signal?: AbortSignal) => {
    const search = [
        {
            Key: 'TagTagNo',
            Value: tagNos.join(','),
        },
    ];
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
        signal: signal,
    };

    return requestOptions;
};

const generateUrl = () => {
    const searchIdDev = 105265;
    const searchIdProd = 115434;

    const uri = 'api/Search';
    const queryParameters = `plantId=${encodeURIComponent('PCS$JOHAN_CASTBERG')}&savedSearchId=${
        isProduction() ? searchIdProd : searchIdDev
    }&currentPage=0&itemsPerPage=20&paging=true&sortColumns=false&api-version=4.1`;

    const url = `${uri}?${queryParameters}`;

    return url;
};

const isTagResponse = (tags: Array<unknown>): tags is SearchTag[] =>
    (tags as SearchTag[])[0].TagNo !== undefined ? true : false;
const createTypedSelectOptionsTags = (jsonResponse: Array<unknown>) => {
    if (jsonResponse.length === 0) return [];
    else if (isTagResponse(jsonResponse)) {
        const data: TypedSelectOption[] = jsonResponse.map(
            (x: SearchTag): TypedSelectOption => ({
                label: `${x.TagNo} - ${x.Description}`,
                value: x.TagNo,
                type: 'tag',
                searchValue: x.TagNo,
                object: x,
                metadata: `Comm pkg: ${
                    x.McPkgsThroughScope__CommPkg__CommPkgNo ?? 'none'
                } | Tag register: ${x.Register__Id} `,
            })
        );

        return data;
    } else return [];
};

export const fetchBatchTag = async (
    tagNos: string[],
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const { procosys } = httpClient();
    const url = generateUrl();
    const requestOptions = generateRequestOptions(tagNos, signal);

    const res = await procosys.fetch(url, requestOptions);
    const jsonRes = await res.json();
    const typedSelectOptionsTags = createTypedSelectOptionsTags(jsonRes);

    return typedSelectOptionsTags;
};
