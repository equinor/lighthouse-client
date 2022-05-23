import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface VoidParams {
    requestId: string;
}

export async function voidReleaseControl({ requestId }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(`api/releasecontrol/${requestId}/void`, requestOptions);

    await throwOnError(res, 'Failed to void request');
}

export async function unVoidReleaseControl({ requestId }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(`api/releasecontrols/${requestId}/unvoid`, requestOptions);

    await throwOnError(res, 'Failed to unvoid request');
}
