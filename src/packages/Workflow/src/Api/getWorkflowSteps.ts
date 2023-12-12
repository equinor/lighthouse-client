import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowStepTemplate } from '@equinor/Workflow';
import { throwOnError } from './throwOnError';

interface QueryProps {
    workflowOwner: string;
}

export const getWorkflowSteps = async ({
    workflowOwner,
}: QueryProps): Promise<WorkflowStepTemplate[]> => {
    const { scopeChange } = httpClient();

    if (!workflowOwner || workflowOwner.length === 0) {
        throw new Error("Workflow owner can't be null");
    }

    const res = await scopeChange.fetch(`api/workflows/workflow-available-steps/${workflowOwner}`);

    throwOnError(res, 'Failed to get steps');

    return await res.json();
};
