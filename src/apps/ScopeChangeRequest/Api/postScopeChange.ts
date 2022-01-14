import { BaseClient } from '@equinor/http-client';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function postScopeChange(
    scopeChange: ScopeChangeRequest,
    draft: boolean,
    client: BaseClient
): Promise<string> {
    const payload = {
        ...scopeChange,
        setAsOpen: !draft,
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };
    return await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`,
            requestOptions
        )
        .then((x) => x.json());
}
