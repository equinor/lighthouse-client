import { httpClient } from '@equinor/lighthouse-portal-client';
import { Workflow } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

export async function postWorkflow(workflow: Workflow): Promise<string> {
  const { scopeChange } = httpClient();
  const requestOptions = {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(workflow),
  };

  const res = await scopeChange.fetch(`api/workflows`, requestOptions);

  await throwOnError(res, 'Failed to create workflow');

  return await res.json();
}
