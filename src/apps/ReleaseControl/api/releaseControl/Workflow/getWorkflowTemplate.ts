import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';
import { ReleaseControlWorkflowTemplate } from '../../../types/releaseControl';

export async function getWorkflowTemplate(
    workflowId: string,
    signal?: AbortSignal
): Promise<ReleaseControlWorkflowTemplate> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/workflows/${workflowId}/templates`, { signal });

    await throwOnError(res, 'Failed to fetch data');

    return await res.json();
}
