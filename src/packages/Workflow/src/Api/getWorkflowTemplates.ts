import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowTemplate } from '@equinor/Workflow';
import { throwOnError } from './throwOnError';

interface QueryProps {
    workflowId: string;
}

export const getWorkflowTemplates = async ({
    workflowId,
}: QueryProps): Promise<WorkflowTemplate[]> => {
    if (!workflowId || workflowId === 'new') {
        return [];
    }
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/workflows/${workflowId}/templates`);

    throwOnError(res, 'Failed to get workflow templates');

    return await res.json();
};
