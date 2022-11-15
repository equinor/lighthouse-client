import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowStepTemplate } from '@equinor/Workflow';
import { throwOnError } from './throwOnError';

interface QueryProps {
    app: string;
    workflowOwner: string;
}

export const getWorkflowSteps = async ({
    app,
    workflowOwner,
}: QueryProps): Promise<WorkflowStepTemplate[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/${app}/steps?workflowOwner=${workflowOwner}`);

    throwOnError(res, 'Failed to get steps');

    return await res.json();
};
