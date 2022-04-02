import { httpClient } from '../../../../../Core/Client/Functions';
import { throwOnError } from '../../../functions/throwError';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';

export async function getScopeChangeById(id: string): Promise<ScopeChangeRequest> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/scope-change-requests/${id}`);

    await throwOnError(res, 'Failed to fetch data');

    return await res.json();
}
