import { ScopeChangeRequestFormModel } from '../../../Types/scopeChangeRequest';
import { throwOnError } from '../../../Functions/throwError';
import { httpClient } from '../../../../../Core/Client/Functions';

interface PostScopeChangeParams {
    scopeChange: ScopeChangeRequestFormModel;
    draft: boolean;
}

export async function postScopeChange({
    draft,
    scopeChange,
}: PostScopeChangeParams): Promise<string> {
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

    await throwOnError(res);

    return await res.json();
}
