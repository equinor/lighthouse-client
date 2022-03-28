import { HttpClient } from '@equinor/http-client';
import { throwOnError } from '../../Functions/throwError';
import { DisciplineReleaseControlFormModel } from '../../Types/disciplineReleaseControl';

export async function postReleaseControl(
    releaseControl: DisciplineReleaseControlFormModel,
    draft: boolean,
    client: HttpClient
): Promise<string> {
    const payload = {
        ...releaseControl,
        setAsOpen: !draft,
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    const res = await client.fetch(`api/release-control-processes`, requestOptions);

    await throwOnError(res);

    return await res.json();
}
