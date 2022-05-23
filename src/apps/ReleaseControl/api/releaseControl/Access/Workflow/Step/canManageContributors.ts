import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from '../../optionsRequestChecker';

interface CanAddContributorParams {
    requestId: string;
    stepId: string;
}

export async function canAddContributor(
    { requestId, stepId }: CanAddContributorParams,
    signal?: AbortSignal
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal: signal,
    };

    const check = () =>
        scopeChange.fetch(
            `api/releasecontrol/${requestId}/workflow/step/${stepId}/contributors`,
            requestOptions
        );

    return await (
        await checkOptionsRequest(check)
    ).canPost;
}
