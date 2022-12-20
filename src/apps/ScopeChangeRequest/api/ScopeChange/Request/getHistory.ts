import { LogEntry } from '@equinor/Workflow';
import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';

export async function getHistory(id: string, signal?: AbortSignal): Promise<LogEntry[]> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/scope-change-requests/${id}/history`, { signal });

    throwOnError(res, 'Failed to get log');

    return await res.json();
}
