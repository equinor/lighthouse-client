import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Area } from '../../Types/ProCoSys/area';

export async function getAreaByCode(areaCode: string): Promise<Area> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Library/Area?plantId=PCS%24JOHAN_CASTBEG&code=${areaCode}&api-version=4.1`
    );

    if (!res.ok) {
        throw 'Failed to get area';
    }

    return await res.json();
}
