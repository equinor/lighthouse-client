import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from './throwOnError';

export async function moveStepUp(id: string): Promise<void> {
    const { scopeChange } = httpClient();
    const requestOptions = {
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
    };

    const res = await scopeChange.fetch(
        `api/workflows/workflow-available-steps/${id}/move-up`,
        requestOptions
    );

    await throwOnError(res, 'Failed to move workflow step up');
}
