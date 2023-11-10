import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowStepModel } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

export async function patchWorkflowStep(step: WorkflowStepModel): Promise<void> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify(step),
    };

    const res = await scopeChange.fetch(
        `api/workflows/workflow-available-steps/${step.id}`,
        requestOptions
    );

    await throwOnError(res, 'Failed to patch workflow step');
}
