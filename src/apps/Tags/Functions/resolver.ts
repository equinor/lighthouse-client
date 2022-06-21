import { getClientContext, httpClient } from '@equinor/lighthouse-portal-client';
import { Tag } from '../Types/tag';

export async function tagResolver(tagNo: string): Promise<Tag> {
    const { procosysPlantId, facilityId } = getClientContext();
    const { procosys, STID } = httpClient();

    const stidUri = `${facilityId}/tag`;
    const queryParametersStid = `tagNo=${encodeURI(tagNo)}`;
    const stidRepsonse = await STID.fetch(`/${stidUri}?${queryParametersStid}`);

    if (stidRepsonse.ok) {
        return stidRepsonse.json();
    }

    const uri = `api/Tag`;
    const queryParameters = `plantId=${procosysPlantId}&tagId=${encodeURI(
        tagNo.replace('#', '')
    )}&api-version=4.1`;

    console.log(`${uri}?${queryParameters}`);
    const response = await procosys.fetch(`${uri}?${queryParameters}`);
    if (response.ok) {
        return response.json();
    }

    throw 'no tags found';
}
