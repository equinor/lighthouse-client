import { HttpClient } from '@equinor/http-client';

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
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );
}
