import { httpClient } from '@equinor/lighthouse-portal-client';
import { Tag, TagWrapper } from '../../../types/PCS/Tag';

export async function getTagById(plantId: string, tagId: number): Promise<Tag> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Tag?plantId=${encodeURI(plantId)}&tagId=${tagId}&api-version=4.1`
    );

    if (!res.ok) {
        throw 'Failed to get tag';
    }

    const parsed: TagWrapper = await res.json();

    return parsed.Tag;
}
