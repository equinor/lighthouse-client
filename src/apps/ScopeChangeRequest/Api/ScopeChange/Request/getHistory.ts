import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { LogEntry } from '../../../Types/scopeChangeRequest';

export async function getHistory(id: string): Promise<LogEntry[]> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/scope-change-requests/${id}/history`);

    if (!res.ok) {
        throw await res.json();
    }
    return await res.json();
}
