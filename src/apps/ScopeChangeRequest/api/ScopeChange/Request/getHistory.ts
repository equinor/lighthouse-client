import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';
import { LogEntry } from '../../../types/scopeChangeRequest';

export async function getHistory(id: string): Promise<LogEntry[]> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/scope-change-requests/${id}/history`);

    throwOnError(res, 'Failed to get log');

    return await res.json();
}
