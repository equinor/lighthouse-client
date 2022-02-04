import { HttpClient } from '@equinor/http-client';
import { FunctionalRole } from './Types/functionalRole';

/**
 * Returns a list of the users functional roles
 * @param procosysClient
 * @returns
 */
export async function checkMyFunctionalRole(procosysClient: HttpClient): Promise<FunctionalRole[]> {
    const uri = 'api/Me/FunctionalRoleCodes';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&api-version=4.1`;
    const url = `${uri}?${queryParameters}`;
    return await procosysClient
        .fetch(url)
        .then((response) => response.json())
        .then((data) => data);
}
