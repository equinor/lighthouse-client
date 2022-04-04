import { ScopeChangeRequestFormModel } from '../../../sTypes/scopeChangeRequest';
import { throwOnError } from '../../../functions/throwError';
import { httpClient } from '../../../../../Core/Client/Functions';

export async function postScopeChange(
    scopeChange: ScopeChangeRequestFormModel,
    draft: boolean
): Promise<string> {
    const { scopeChange: client } = httpClient();

    const payload = {
        ...scopeChange,
        setAsOpen: !draft,
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    const res = await client.fetch(`api/scope-change-requests`, requestOptions);

    await throwOnError(res, 'Failed to create scopechange');

    return await res.json();
}
