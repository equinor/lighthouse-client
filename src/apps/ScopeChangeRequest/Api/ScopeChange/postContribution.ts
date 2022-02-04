import { httpClient } from '../../../../Core/Client/Functions/HttpClient';

export async function postContribution(
    requestId: string,
    stepId: string,
    contributorId: string,
    comment?: string
): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            comment: comment,
            suggestion: 'SuggestRejection',
        }),
    };
    await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );
}
