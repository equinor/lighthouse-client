import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Tag, TagWrapper } from './Types/Tag';

export async function getTagById(tagId: number): Promise<Tag> {
    const { procosys } = httpClient();

    const responseData: TagWrapper = await procosys
        .fetch(`api/Tag?plantId=PCS%24JOHAN_CASTBERG&tagId=${tagId}&api-version=4.1`)
        .then((x) => x.json());

    return responseData.Tag;
}
