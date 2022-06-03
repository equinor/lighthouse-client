import { httpClient } from '@equinor/lighthouse-portal-client';
import { FunctionalRole } from '../../../types/functionalRole';
/**
 * Returns a list of all the functional roles for scope change
 */
export async function getFunctionalRoles(
    plantId: string,
    classification?: string,
    signal?: AbortSignal
): Promise<FunctionalRole[]> {
    const { procosys } = httpClient();

    const uri = 'api/library/functionalroles';
    const queryParameters = `plantId=${encodeURIComponent(plantId)}&classification=${
        classification ?? 'RELEASECONTROL'
    }&api-version=4.1`;
    const request = `${uri}?${queryParameters}`;

    const response = await procosys.fetch(request, { signal });

    if (!response.ok) {
        throw 'Failed to get functional roles';
    }

    return await response.json();
}
