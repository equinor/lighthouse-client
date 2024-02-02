import { httpClient } from '@equinor/lighthouse-portal-client';

export async function getScopeTag(getScopeTag: string, signal?: AbortSignal): Promise<any> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/releasecontrol/${getScopeTag}/scopeTag`, { signal });
    if (!res.ok) {
        throw new Error(`Failed to get scopetag ${getScopeTag}`, { cause: res });
    }
    return await res.json();
}
