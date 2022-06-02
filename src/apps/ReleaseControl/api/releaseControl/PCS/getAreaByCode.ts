import { httpClient } from '@equinor/lighthouse-portal-client';
import { Area } from '../../../types/PCS/Area';

export async function getAreaByCode(plantId: string, areaCode: string): Promise<Area> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Library/Area?plantId=${encodeURIComponent(plantId)}&code=${areaCode}&api-version=4.1`
    );

    if (!res.ok) {
        throw 'Failed to get area';
    }

    return await res.json();
}
