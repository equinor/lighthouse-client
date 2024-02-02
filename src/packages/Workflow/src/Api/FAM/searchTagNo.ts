import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTagNo(searchTagNo: string, signal?: AbortSignal): Promise<any[]> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(
        `api/releasecontrol/searchScopeTag?searchString=${encodeURIComponent(searchTagNo)}`,
        { signal }
    );
    if (!res.ok) {
        throw new Error(`Failed to search scopetag ${searchTagNo}`, { cause: res });
    }
    return await res.json();
}
