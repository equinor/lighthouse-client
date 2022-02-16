import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { System } from '../Search/PCS/Types/system';

export async function getSystems() {
    const { procosys } = httpClient();

    const res: Promise<System[]> = await procosys
        .fetch(
            'api/Systems?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&onlyActiveSystems=true&api-version=4.1'
        )
        .then((x) => x.json());

    return res;
}
