import { httpClient } from '@equinor/lighthouse-portal-client';
import { Tag, TagWrapper } from '../../Types/ProCoSys/Tag';

export async function getTagById(
  plantId: string,
  tagId: number,
  signal?: AbortSignal
): Promise<Tag> {
  const { procosys } = httpClient();

  const res = await procosys.fetch(
    `api/Tag?plantId=${encodeURI(plantId)}&tagId=${tagId}&api-version=4.1`,
    { signal }
  );

  if (!res.ok) {
    throw 'Failed to get tag';
  }

  const parsed: TagWrapper = await res.json();

  return parsed.Tag;
}
