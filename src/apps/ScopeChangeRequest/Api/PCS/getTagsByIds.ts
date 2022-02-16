import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Tag } from './Types/Tag';

export async function getTagsByIds(tagNos: string[]): Promise<Tag[]> {
    const { procosys } = httpClient();

    return await procosys
        .fetch(
            `api/Tag/ByTagNos?plantId=PCS%24JOHAN_CASTBERG${tagNos.map(
                (x) => `&tagNos=${x}`
            )}&api-version=4.1`
        )
        .then((x) => x.json());
}
