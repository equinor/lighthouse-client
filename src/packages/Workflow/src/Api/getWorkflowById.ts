import { httpClient } from '@equinor/lighthouse-portal-client';
import { Workflow } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

interface QueryProps {
    workflowId: string;
}

export const getWorkflowById = async ({ workflowId }: QueryProps): Promise<Workflow> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/workflows/${workflowId}`);

    throwOnError(res, 'Failed to get workflow');

    return await res.json();
};
