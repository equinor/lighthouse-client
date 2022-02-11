import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { ScopeChangeRequestFormModel } from '../../../Types/scopeChangeRequest';
import { throwOnError } from '../Functions/throwError';

export async function patchScopeChange(request: ScopeChangeRequestFormModel): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(request),
    };

    const res = await scopeChange
        .fetch(`api/scope-change-requests/${request.id}`, requestOptions)

    await throwOnError(res);

    return await res.json()
}
