import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { ScopeChangeRequestFormModel } from '../../Types/scopeChangeRequest';

export async function patchScopeChange(request: ScopeChangeRequestFormModel): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(request),
    };
    return await scopeChange
        .fetch(`api/scope-change-requests/${request.id}`, requestOptions)
        .then((response) => response.json());
}
