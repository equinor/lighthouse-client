import { httpClient } from '../../../../../Core/Client/Functions';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export async function getScopeChangeById(id: string): Promise<ScopeChangeRequest> {
    const { scopeChange } = httpClient();

    return await scopeChange.fetch(`api/scope-change-requests/${id}`).then((x) => x.json());
}
