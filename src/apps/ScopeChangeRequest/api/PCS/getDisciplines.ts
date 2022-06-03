import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Discipline } from '../../types/ProCoSys/discipline';

/**
 * Fetches a list of all disciplines
 * @returns
 */
export async function getDisciplines(plantId: string, signal?: AbortSignal): Promise<Discipline[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Library/Disciplines?plantId=${encodeURIComponent(plantId)}&api-version=4.1`,
        { signal }
    );

    if (!res.ok) {
        throw 'Failed to get disciplines';
    }

    return await res.json();
}
