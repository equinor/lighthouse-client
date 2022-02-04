import { HttpClient } from '@equinor/http-client';
import { ScopeChangeRequestFormModel } from '../../Types/scopeChangeRequest';

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
    return await client.fetch(`api/scope-change-requests`, requestOptions).then((x) => x.json());
}
