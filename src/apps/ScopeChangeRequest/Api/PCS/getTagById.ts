import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Tag } from '../../Types/ProCoSys/Tag';

export async function getTagById(tagId: number): Promise<Tag> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Tag?plantId=PCS%24JOHAN_CASTBERG&tagId=${tagId}&api-version=4.1`
    );

    if (!res.ok) {
        throw 'Failed to get tag';
    }

    return await res.json()['Tag'];
}
