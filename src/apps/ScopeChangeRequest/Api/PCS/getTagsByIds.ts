import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Tag } from '../../Types/ProCoSys/Tag';

export async function getTagsByIds(tagNos: string[]): Promise<Tag[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Tag/ByTagNos?plantId=PCS%24JOHAN_CASTBERG${tagNos.map(
            (x) => `&tagNos=${x}`
        )}&api-version=4.1`
    );
    if (!res.ok) {
        throw 'Failed to get tags';
    }

    return await res.json();
}
