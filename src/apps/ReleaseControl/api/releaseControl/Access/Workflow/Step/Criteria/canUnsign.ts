import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface canUnsignParams {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

export async function canUnsign(
    { requestId, stepId, criteriaId }: canUnsignParams,
    signal?: AbortSignal
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal: signal,
    };

    const check = () =>
        scopeChange.fetch(
            `api/releasecontrol/${requestId}/workflow/step/${stepId}/unsign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
