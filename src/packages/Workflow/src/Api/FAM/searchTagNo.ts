import { httpClient } from '@equinor/lighthouse-portal-client';
import { RcScopeTag } from '../../../../../apps/ReleaseControl/types/releaseControl';

export async function searchTagNo(
  searchTagNo: string,
  signal?: AbortSignal
): Promise<RcScopeTag[]> {
  const { scopeChange } = httpClient();
  const res = await scopeChange.fetch(
    `api/scopetag/search?query=${encodeURIComponent(searchTagNo)}`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`Failed to search scopetag ${searchTagNo}`, { cause: res });
  }
  return await res.json();
}
