import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function getScopeChangeById(id: string): Promise<ScopeChangeRequest> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${id}`,
        requestOptions
    ).then((x) => {
        return x.json();
    });
}
