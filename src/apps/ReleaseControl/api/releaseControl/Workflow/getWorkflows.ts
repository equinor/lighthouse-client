import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';
import { ReleaseControlWorkflow } from '../../../types/releaseControl';

export interface QueryContext {
    signal?: AbortSignal;
}

export const getWorkflows = async ({ signal }: QueryContext): Promise<ReleaseControlWorkflow[]> => {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/workflows?owner=ReleaseControl`, { signal });

    await throwOnError(res, 'Failed to fetch data');

    return await res.json();
};
