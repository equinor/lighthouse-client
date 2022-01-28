import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';

export async function canSign(
    requestId: string,
    stepId: string,
    criteriaId: string
): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };
    await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );
}
