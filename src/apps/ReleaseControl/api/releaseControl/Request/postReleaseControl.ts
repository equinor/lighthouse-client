import { throwOnError } from '../../../functions/throwError';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { DRCFormModel } from '../../../Atoms/formAtomApi';

export async function postReleaseControl(
    releaseControl: DRCFormModel,
    draft: boolean
): Promise<string> {
    const { scopeChange: client } = httpClient();

    const payload = {
        ...releaseControl,
        setAsOpen: !draft,
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    const res = await client.fetch(`api/releasecontrol`, requestOptions);

    await throwOnError(res, 'Failed to create release control');

    return await res.json();
}
