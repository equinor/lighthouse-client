import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function postScopeChange(
    scopeChange: ScopeChangeRequest,
    draft: boolean
): Promise<string> {
    const payload = {
        ...scopeChange,
        setAsOpen: !draft,
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };
    return await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`,
        requestOptions
    ).then((x) => x.json());
}
