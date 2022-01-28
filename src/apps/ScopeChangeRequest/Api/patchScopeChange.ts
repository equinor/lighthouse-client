import { HttpClient } from '@equinor/http-client';
import { ScopeChangeRequestFormModel } from '../Types/scopeChangeRequest';

export async function patchScopeChange(
    request: ScopeChangeRequestFormModel,
    client: HttpClient
): Promise<string> {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(request),
    };
    return await client
        .fetch(`api/scope-change-requests/${request.id}`, requestOptions)
        .then((response) => response.json());
}
