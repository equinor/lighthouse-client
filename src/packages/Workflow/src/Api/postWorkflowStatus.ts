import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

export async function postWorkflowStatus(name: string, workflowOwner: string): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify({ name: name, owner: workflowOwner }),
    };

    const res = await scopeChange.fetch(`api/workflows/workflow-step-statuses`, requestOptions);

    await throwOnError(res, 'Failed to create workflow status');

    return await res.json();
}
