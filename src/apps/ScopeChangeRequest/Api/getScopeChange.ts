import { BaseClient } from '../../../../packages/httpClient/src';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function getScopeChangeById(
    id: string,
    client: BaseClient
): Promise<ScopeChangeRequest> {
    return await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${id}`
        )
        .then((x) => x.json());
}
