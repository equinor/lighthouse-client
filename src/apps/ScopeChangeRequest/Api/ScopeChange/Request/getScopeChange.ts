import { httpClient } from '../../../../../Core/Client/Functions';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export async function getScopeChangeById(id: string): Promise<ScopeChangeRequest> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/scope-change-requests/${id}`);

    if (!res.ok) {
        throw 'Failed to get request';
    }

    return await res.json();
}
