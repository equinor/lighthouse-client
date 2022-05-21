import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';
import { ScopeChangeCreateEditModel } from '../../../types/scopeChangeRequest';

export async function patchScopeChange(
    request: ScopeChangeCreateEditModel,
    setAsOpen?: boolean
): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: setAsOpen
            ? JSON.stringify({ ...request, setAsOpen: setAsOpen })
            : JSON.stringify(request),
    };

    const res = await scopeChange.fetch(`api/scope-change-requests/${request.id}`, requestOptions);

    await throwOnError(res, 'Failed to update scopechange');

    return await res.json();
}
