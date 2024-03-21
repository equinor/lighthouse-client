import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkflowTemplateModel } from '../Types/WorkflowTypes';
import { throwOnError } from './throwOnError';

export async function patchWorkflowTemplate(
  template: WorkflowTemplateModel,
  workflowId: string
): Promise<void> {
  const { scopeChange } = httpClient();
  const requestOptions = {
    method: 'PATCH',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify({ stepTemplates: template.workflowStepTemplates }),
  };

  const res = await scopeChange.fetch(
    `api/workflows/${workflowId}/templates/${template.id}`,
    requestOptions
  );

  await throwOnError(res, 'Failed to patch workflow template');
}
