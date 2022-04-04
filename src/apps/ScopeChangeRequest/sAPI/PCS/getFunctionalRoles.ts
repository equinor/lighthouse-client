import { FunctionalRole } from '../../sTypes/ProCoSys/functionalRole';
import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
/**
 * Returns a list of all the functional roles for scope change
 */
export async function getFunctionalRoles(plantId: string): Promise<FunctionalRole[]> {
    const { procosys } = httpClient();

    const uri = 'api/library/functionalroles';
    const queryParameters = `plantId=${encodeURIComponent(
        plantId
    )}&classification=SCOPECHANGE&api-version=4.1`;
    const request = `${uri}?${queryParameters}`;

    const response = await procosys.fetch(request);

    if (!response.ok) {
        throw 'Failed to get functional roles';
    }

    return await response.json();
}
