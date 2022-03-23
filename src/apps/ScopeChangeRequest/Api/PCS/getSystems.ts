import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { System } from '../../Types/ProCoSys/system';

export async function getSystems(): Promise<System[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        'api/Systems?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&onlyActiveSystems=true&api-version=4.1'
    );

    if (!res.ok) {
        throw 'Failed to get systems';
    }

    return await res.json();
}
