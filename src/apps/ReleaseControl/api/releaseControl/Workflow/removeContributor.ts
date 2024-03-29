import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface RemoveContributorParams {
  requestId: string;
  stepId: string;
  contributorId: string;
}

export const removeContributor = async ({
  contributorId,
  requestId,
  stepId,
}: RemoveContributorParams): Promise<void> => {
  const { scopeChange } = httpClient();

  const requestOptions = {
    method: 'DELETE',
  };

  const res = await scopeChange.fetch(
    `api/releasecontrol/${requestId}/workflow/step/${stepId}/contributors/${contributorId}`,
    requestOptions
  );

  await throwOnError(res);
};
