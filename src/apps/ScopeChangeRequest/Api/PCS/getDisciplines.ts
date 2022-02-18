import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Discipline } from './Types/discipline';

/**
 * Fetches a list of all disciplines
 * @returns
 */
export async function getDisciplines(): Promise<Discipline[]> {
    const { procosys } = httpClient();

    const res: Promise<Discipline[]> = await procosys
        .fetch('api/Library/Disciplines?plantId=PCS%24JOHAN_CASTBERG&api-version=4.1')
        .then((x) => x.json());

    return res;
}
