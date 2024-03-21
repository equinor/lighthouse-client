import { httpClient } from '@equinor/lighthouse-portal-client';
import { EleNetworkCable } from '../types/eleNetwork';
import { throwOnError } from './throwOnError';

export async function disconnectCable(
  circuitAndStarterTagNo: string,
  cableTagNo: string,
  comment: string
): Promise<EleNetworkCable> {
  const { scopeChange: client } = httpClient();

  const payload = {
    tagNo: cableTagNo,
    comment: comment,
  };

  const requestOptions = {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(payload),
  };

  const res = await client.fetch(
    `api/elenetwork/facility/JCA/elenetwork/${circuitAndStarterTagNo}/cable/disconnect`,
    requestOptions
  );

  await throwOnError(res, 'Failed to disconnect cable');

  return await res.json();
}
