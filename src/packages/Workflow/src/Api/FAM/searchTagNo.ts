import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTagNo(searchTagNo: string, signal?: AbortSignal): Promise<any[]> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(
        `api/releasecontrol/searchScopeTag?searchString=${encodeURIComponent(searchTagNo)}`,
        { signal }
    );
    return await res.json();
}
