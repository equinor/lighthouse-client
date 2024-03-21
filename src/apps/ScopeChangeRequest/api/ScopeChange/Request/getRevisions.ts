import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';

export async function getRevisions(
  id: string,
  signal?: AbortSignal
): Promise<ScopeChangeRequest[]> {
  const { scopeChange } = httpClient();

  const res = await scopeChange.fetch(`api/scope-change-requests/${id}/revisions`, { signal });

  throwOnError(res, 'Failed to get log');

  const revisions: ScopeChangeRequest[] = await res.json();

  return revisions.sort((a, b) => b.revisionNumber - a.revisionNumber);
}
