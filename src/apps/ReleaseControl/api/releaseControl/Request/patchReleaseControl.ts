import { httpClient } from '@equinor/lighthouse-portal-client';
import { DRCFormModel } from '../../../Atoms/formAtomApi';
import { throwOnError } from '../../../functions/throwError';

export async function patchReleaseControl(
    request: DRCFormModel,
    setAsOpen?: boolean
): Promise<string> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'PATCH',
        body: setAsOpen
            ? JSON.stringify({ ...request, setAsOpen: setAsOpen, allowContibutors: true })
            : JSON.stringify({ ...request, allowContibutors: true }),
    };

    const res = await scopeChange.fetch(`api/releasecontrol/${request.id}`, requestOptions);

    await throwOnError(res, 'Failed to update release control');

    return await res.json();
}
