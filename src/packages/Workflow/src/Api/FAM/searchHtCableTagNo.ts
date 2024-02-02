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
    if (!res.ok) {
        throw new Error('Failed to get HT tags');
    }

    return await res.json();
}
