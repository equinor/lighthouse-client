import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function patchScopeChange(request: ScopeChangeRequest): Promise<string> {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    };
    return await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
        requestOptions
    ).then((response) => response.json());
}
