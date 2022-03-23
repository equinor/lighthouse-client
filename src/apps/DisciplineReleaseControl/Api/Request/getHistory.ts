import { httpClient } from '../../../../Core/Client/Functions';
import { LogEntry } from '../../Types/disciplineReleaseControl';

export async function getHistory(id: string): Promise<LogEntry[]> {
    const { releaseControls } = httpClient();

    return await releaseControls
        .fetch(`api/release-control-processes/${id}/history`)
        .then((history) => history.json());
}
