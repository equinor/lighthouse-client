import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Tag, TagWrapper } from '../../Types/ProCoSys/Tag';

export async function getTagById(tagId: number): Promise<Tag> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Tag?plantId=PCS%24JOHAN_CASTBERG&tagId=${tagId}&api-version=4.1`
    );

    if (!res.ok) {
        throw 'Failed to get tag';
    }

    const parsed: TagWrapper = await res.json();

    return parsed.Tag;
}
