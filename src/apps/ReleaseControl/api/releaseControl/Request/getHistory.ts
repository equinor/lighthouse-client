import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { LogEntry } from '../../../../ScopeChangeRequest/types/scopeChangeRequest';
import { throwOnError } from '../../../functions/throwError';

export async function getHistory(id: string, signal?: AbortSignal): Promise<LogEntry[]> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/releasecontrol/${id}/history`, { signal });

    throwOnError(res, 'Failed to get log');

    return await res.json();
}
