import { HttpClient } from '@equinor/http-client';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function getScopeChangeById(
    id: string,
    client: HttpClient
): Promise<ScopeChangeRequest> {
    return await client.fetch(`api/scope-change-requests/${id}`).then((x) => x.json());
}
