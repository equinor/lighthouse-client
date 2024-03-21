import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

interface QueryProps {
  id: string;
}

export const deleteWorkflowStatus = async ({ id }: QueryProps): Promise<void> => {
  const { scopeChange } = httpClient();

  const requestOptions = {
    method: 'DELETE',
  };

  const res = await scopeChange.fetch(`api/workflows/workflow-step-statuses/${id}`, requestOptions);

  throwOnError(res, 'Failed to delete workflow status');
};
