import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowStepTemplate } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

interface QueryProps {
  stepId: string;
}

export const getWorkflowStepById = async ({
  stepId,
}: QueryProps): Promise<WorkflowStepTemplate> => {
  const { scopeChange } = httpClient();
  const res = await scopeChange.fetch(`api/workflows/workflow-available-steps/${stepId}`);

  throwOnError(res, 'Failed to get workflow step');

  return await res.json();
};
