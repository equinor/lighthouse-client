import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface VoidParams {
    releaseControlId: string;
}

export async function voidReleaseControl({ releaseControlId }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(
        `api/releasecontrol/${releaseControlId}/void`,
        requestOptions
    );

    await throwOnError(res, 'Failed to void request');
}

export async function unVoidReleaseControl({ releaseControlId }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(
        `api/releasecontrol/${releaseControlId}/unvoid`,
        requestOptions
    );

    await throwOnError(res, 'Failed to unvoid request');
}
