import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Discipline } from '../../Types/ProCoSys/discipline';

/**
 * Fetches a list of all disciplines
 * @returns
 */
export async function getDisciplines(): Promise<Discipline[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        'api/Library/Disciplines?plantId=PCS%24JOHAN_CASTBERG&api-version=4.1'
    );

    if (!res.ok) {
        throw 'Failed to get disciplines';
    }

    return await res.json();
}
