import { httpClient } from '@equinor/lighthouse-portal-client';
import { LogEntry } from '@equinor/Workflow';
import { throwOnError } from '../../../functions/throwError';

export async function getHistory(id: string, signal?: AbortSignal): Promise<LogEntry[]> {
  const { scopeChange } = httpClient();
  const res = await scopeChange.fetch(`api/releasecontrol/${id}/history`, { signal });

  throwOnError(res, 'Failed to get log');

  return await res.json();
}
