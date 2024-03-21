import { httpClient } from '@equinor/lighthouse-portal-client';
import { ScopeChangeRequest } from '../Types/ScopeChangeRequest';
import { throwOnError } from './throwOnError';

export async function findScopeChangeRequest(
  searchString: string,
  signal?: AbortSignal
): Promise<ScopeChangeRequest[]> {
  const { scopeChange } = httpClient();

  const res = await scopeChange.fetch(`api/scope-change-requests/${searchString}/find`, {
    method: 'GET',
    body: null,
    signal,
  });

  await throwOnError(res, 'Failed to find scope change requests');
  const scopeChangeRequests: ScopeChangeRequest[] = await res.json();

  if (!Array.isArray(scopeChangeRequests)) {
    throw 'Invalid response';
  }

  return scopeChangeRequests;
}
