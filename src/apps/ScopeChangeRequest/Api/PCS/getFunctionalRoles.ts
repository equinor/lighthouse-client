import { FunctionalRole } from './Types/functionalRole';
import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
/**
 * Returns a list of all the functional roles for scope change
 */
export async function getFunctionalRoles(): Promise<FunctionalRole[]> {
    const { procosys } = httpClient();

    const uri = 'api/library/functionalroles';
    const queryParameters =
        'plantId=PCS%24JOHAN_CASTBERG&classification=SCOPECHANGE&api-version=4.1';
    const request = `${uri}?${queryParameters}`;

    const response = await procosys.fetch(request);

    return await response.json();
}
