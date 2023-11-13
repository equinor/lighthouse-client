import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

export async function patchWorkflowStatus(id: string, name: string): Promise<void> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({ name: name }),
    };

    const res = await scopeChange.fetch(
        `api/workflows/workflow-step-statuses/${id}`,
        requestOptions
    );

    await throwOnError(res, 'Failed to patch workflow status');
}
