import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function canEdit(requestId: string): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () => scopeChange.fetch(`api/releasecontrol/${requestId}`, requestOptions);

    const access = await checkOptionsRequest(check);
    return access.canPatch;
}
