import { BaseClient } from '@equinor/http-client';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function patchScopeChange(
    request: ScopeChangeRequest,
    client: BaseClient
): Promise<string> {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(request),
    };
    return await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
            requestOptions
        )
        .then((response) => response.json());
}
