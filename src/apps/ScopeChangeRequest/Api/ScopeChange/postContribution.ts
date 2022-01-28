import { HttpClient } from '@equinor/http-client';

export async function postContribution(
    requestId: string,
    stepId: string,
    contributorId: string,
    client: HttpClient,
    comment?: string
): Promise<void> {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            comment: comment,
            suggestion: 'SuggestRejection',
        }),
    };
    await client.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );
}
