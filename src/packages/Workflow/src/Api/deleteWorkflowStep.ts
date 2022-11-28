import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

interface QueryProps {
    stepId: string;
}

export const deleteWorkflowStep = async ({ stepId }: QueryProps): Promise<void> => {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'DELETE',
    };

    const res = await scopeChange.fetch(
        `api/workflows/workflow-available-steps/${stepId}`,
        requestOptions
    );

    throwOnError(res, 'Failed to delete workflow step');
};
