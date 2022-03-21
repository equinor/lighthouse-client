import { httpClient } from '../../../../../../Core/Client/Functions/HttpClient';
import { LogEntry } from '../../../../Types/scopeChangeRequest';

async function getHistory(id: string): Promise<LogEntry[]> {
    const { scopeChange } = httpClient();

    return await scopeChange
        .fetch(`api/scope-change-requests/${id}/history`)
        .then((history) => history.json());
}



