import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowStatus } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

export const getWorkflowStatuses = async (workflowOwner: string): Promise<WorkflowStatus[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/workflows/workflow-step-statuses/${workflowOwner}`);

    throwOnError(res, 'Failed to get statuses');

    return await res.json();
};
