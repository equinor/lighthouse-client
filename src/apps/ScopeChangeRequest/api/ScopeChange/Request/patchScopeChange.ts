import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { ScopeChangeRequestFormModel } from '../../../types/scopeChangeRequest';
import { throwOnError } from '../../../functions/throwError';

export async function patchScopeChange(request: ScopeChangeRequestFormModel): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(request),
    };

    const res = await scopeChange.fetch(`api/scope-change-requests/${request.id}`, requestOptions);

    await throwOnError(res, 'Failed to update scopechange');

    return await res.json();
}
