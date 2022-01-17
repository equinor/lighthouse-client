import { BaseClient } from '../../../../../../packages/httpClient/src';
import { FunctionalRole } from './Types/functionalRole';

/**
 * Returns a list of the users functional roles
 * @param procosysClient
 * @returns
 */
export async function checkMyFunctionalRole(procosysClient: BaseClient): Promise<FunctionalRole[]> {
    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'Me/FunctionalRoleCodes';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&api-version=4.1`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    return await procosysClient
        .fetch(url)
        .then((response) => response.json())
        .then((data) => data);
}
