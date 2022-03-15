import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { ScopeChangeRequestFormModel } from '../../../Types/scopeChangeRequest';
import { throwOnError } from '../../../Functions/throwError';

interface PatchScopeChangeBody {
    request: ScopeChangeRequestFormModel;
    setAsOpen: boolean;
}

export async function patchScopeChange({
    request,
    setAsOpen,
}: PatchScopeChangeBody): Promise<string> {
    const { scopeChange } = httpClient();

    const payload: PatchScopeChangeBody = {
        request,
        setAsOpen,
    };

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(payload),
    };

    const res = await scopeChange.fetch(`api/scope-change-requests/${request.id}`, requestOptions);

    await throwOnError(res);

    return await res.json();
}
