import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowTemplateModel } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

export async function postWorkflowTemplate(
    template: WorkflowTemplateModel,
    workflowId: string
): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify({ stepTemplates: template.workflowStepTemplates }),
    };

    const res = await scopeChange.fetch(`api/workflows/${workflowId}/templates`, requestOptions);

    await throwOnError(res, 'Failed to create workflow template');

    return await res.json();
}
