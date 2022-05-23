import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';
import { ReleaseControl } from '../../../types/releaseControl';

export async function patchReleaseControl(
    request: ReleaseControl,
    setAsOpen?: boolean
): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: setAsOpen
            ? JSON.stringify({ ...request, setAsOpen: setAsOpen })
            : JSON.stringify(request),
    };

    const res = await scopeChange.fetch(`api/releasecontrol/${request.id}`, requestOptions);

    await throwOnError(res, 'Failed to update release control');

    return await res.json();
}
