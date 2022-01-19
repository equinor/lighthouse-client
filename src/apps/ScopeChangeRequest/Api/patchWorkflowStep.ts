import { HttpClient } from '../../../../packages/httpClient/src';

export async function patchWorkflowStep(
    requestId: string,
    stepId: string,
    criteriaId: string,
    client: HttpClient,
    comment?: string
): Promise<void> {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
            signedComment: comment,
            signedState: 'Approved',
        }),
    };
    await client.fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );
}
