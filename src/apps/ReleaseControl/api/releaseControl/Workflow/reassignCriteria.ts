import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface ReassignBody {
  type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
  value: string;
}

export interface ReassignCriteriaParameters {
  requestId: string;
  stepId: string;
  criteriaId: string;
  reassign: ReassignBody;
}
export async function reassignCriteria({
  requestId,
  stepId,
  criteriaId,
  reassign,
}: ReassignCriteriaParameters): Promise<void> {
  const { scopeChange } = httpClient();

  const requestOptions = {
    method: 'PATCH',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(reassign),
  };

  const response = await scopeChange.fetch(
    `api/releasecontrol/${requestId}/workflow/step/${stepId}/reassign/${criteriaId}`,
    requestOptions
  );

  await throwOnError(response);
}
