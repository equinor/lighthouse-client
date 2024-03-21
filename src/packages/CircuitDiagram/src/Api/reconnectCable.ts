import { httpClient } from '@equinor/lighthouse-portal-client';
import { EleNetworkCable } from '../types/eleNetwork';
import { throwOnError } from './throwOnError';

export async function reconnectCable(
  circuitAndStarterTagNo: string,
  cableTagNo: string
): Promise<EleNetworkCable> {
  const { scopeChange: client } = httpClient();

  const payload = {
    tagNo: cableTagNo,
  };

  const requestOptions = {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(payload),
  };
  const res = await client.fetch(
    `api/elenetwork/facility/JCA/elenetwork/${circuitAndStarterTagNo}/cable/reconnect`,
    requestOptions
  );

  await throwOnError(res, 'Failed to reconnect cable');

  return await res.json();
}
