import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Discipline } from '../../Types/ProCoSys/discipline';

export async function getDisciplineByCode(discCode: string): Promise<Discipline> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Library/Discipline?plantId=PCS%24JOHAN_CASTBERG&code=${discCode}&api-version=4.1`
    );
    if (!res.ok) {
        throw 'Failed to get discipline';
    }

    return await res.json();
}
