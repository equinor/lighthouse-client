import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface CanReassignParams {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

export async function canReassign(
    { criteriaId, requestId, stepId }: CanReassignParams,
    signal?: AbortSignal
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal: signal,
    };

    const check = () =>
        scopeChange.fetch(
            `api/releasecontrol/${requestId}/workflow/step/${stepId}/reassign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
