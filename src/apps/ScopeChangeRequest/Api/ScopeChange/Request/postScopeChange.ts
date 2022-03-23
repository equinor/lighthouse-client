import { HttpClient } from '@equinor/http-client';
import { ScopeChangeRequestFormModel } from '../../../Types/scopeChangeRequest';
import { throwOnError } from '../../../Functions/throwError';

export async function postScopeChange(
    scopeChange: ScopeChangeRequestFormModel,
    draft: boolean,
    client: HttpClient
): Promise<string> {
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
