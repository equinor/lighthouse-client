import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchHtCableTagNo(
    searchTagNo: string,
    signal?: AbortSignal
): Promise<any[]> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(
        `api/releasecontrol/searchScopeHtTag?searchString=${encodeURIComponent(searchTagNo)}`,
        { signal }
    );
    return await res.json();
}
