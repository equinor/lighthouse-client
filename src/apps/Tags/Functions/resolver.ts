import { getClientContext, httpClient } from '@equinor/lighthouse-portal-client';
import { Tag } from '../Types/tag';

export async function tagResolver(tagNo: string): Promise<Tag> {
    const { procosysPlantId } = getClientContext();
    const { procosys } = httpClient();

    const projectName = window.location.search;

    const uri = `api/Tag/ByTagNos`;
    const queryParameters =
        `${projectName}&plantId=${procosysPlantId}&tagNos=${tagNo}&&api-version=4.1`.replace(
            '#',
            '%23'
        );
    const response = await procosys.fetch(`${uri}${queryParameters}`);
    if (response.ok) {
        const tags: Tag[] = await response.json();
        return tags[0];
    }

    throw 'no tags found';
}
