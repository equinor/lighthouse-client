import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';
import { ReleaseControl } from '../../../types/releaseControl';

export async function getReleaseControlById(
    id: string,
    signal?: AbortSignal
): Promise<ReleaseControl> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/releasecontrol/${id}`, { signal });

    await throwOnError(res, 'Failed to fetch data');

    return await res.json();
}
