import { BaseClient } from '@equinor/http-client';

export async function postContribution(
    requestId: string,
    stepId: string,
    contributorId: string,
    client: BaseClient,
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
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );
}
