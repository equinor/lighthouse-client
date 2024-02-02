import { httpClient } from '@equinor/lighthouse-portal-client';
import { RcScopeHtTag } from '../../../../../apps/ReleaseControl/types/releaseControl';

export async function searchHtCableTagNo(
    searchTagNo: string,
    signal?: AbortSignal
): Promise<RcScopeHtTag[]> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(
        `api/scopetag/search-ht-tag?query=${encodeURIComponent(searchTagNo)}`,
        { signal }
    );
    if (!res.ok) {
        throw new Error('Failed to get HT tags');
    }

    return await res.json();
}
