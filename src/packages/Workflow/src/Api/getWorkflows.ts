import { httpClient } from '@equinor/lighthouse-portal-client';
import { Workflow } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

interface QueryProps {
    workflowOwner: string;
}

export const getWorkflows = async ({ workflowOwner }: QueryProps): Promise<Workflow[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/workflows?owner=${workflowOwner}`);

    throwOnError(res, 'Failed to get workflows');

    return await res.json();
};
