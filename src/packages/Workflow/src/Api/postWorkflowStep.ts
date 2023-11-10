import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowStepModel } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

export async function postWorkflowStep(step: WorkflowStepModel): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify(step),
    };

    const res = await scopeChange.fetch(`api/workflows/workflow-available-steps`, requestOptions);

    await throwOnError(res, 'Failed to create workflow step');

    return await res.json();
}
