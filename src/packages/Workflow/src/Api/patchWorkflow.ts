import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

export async function patchWorkflow(workflowId: string, name: string): Promise<void> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({ name: name }),
    };

    const res = await scopeChange.fetch(`api/workflows/${workflowId}`, requestOptions);

    await throwOnError(res, 'Failed to patch workflow');
}
