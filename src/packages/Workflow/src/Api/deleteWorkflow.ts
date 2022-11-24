import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

interface QueryProps {
    workflowId: string;
}

export const deleteWorkflow = async ({ workflowId }: QueryProps): Promise<void> => {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'DELETE',
    };

    const res = await scopeChange.fetch(`api/workflows/${workflowId}`, requestOptions);

    throwOnError(res, 'Failed to delete workflow');
};
