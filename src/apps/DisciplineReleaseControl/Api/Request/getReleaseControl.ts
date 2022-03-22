import { HttpClient } from '@equinor/http-client';
import { DisciplineReleaseControl } from '../../Types/disciplineReleaseControl';

export async function getReleaseControlById(
    id: string,
    client: HttpClient
): Promise<DisciplineReleaseControl> {
    return await client.fetch(`api/release-control-processes/${id}`).then((x) => x.json());
}
