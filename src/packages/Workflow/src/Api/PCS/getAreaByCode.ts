import { httpClient } from '@equinor/lighthouse-portal-client';
import { Area } from '../../Types/ProCoSys/area';

export async function getAreaByCode(
  plantId: string,
  areaCode: string,
  signal?: AbortSignal
): Promise<Area> {
  const { procosys } = httpClient();

  const res = await procosys.fetch(
    `api/Library/Area?plantId=${encodeURIComponent(plantId)}&code=${areaCode}&api-version=4.1`,
    { signal }
  );

  if (!res.ok) {
    throw 'Failed to get area';
  }

  return await res.json();
}
