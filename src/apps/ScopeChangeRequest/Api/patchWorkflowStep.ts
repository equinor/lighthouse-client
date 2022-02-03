import { httpClient } from '../../../Core/Client/Functions/HttpClient';

export async function patchWorkflowStep(
    requestId: string,
    stepId: string,
    criteriaId: string,
    comment?: string
): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
            signedComment: comment,
            signedState: 'Approved',
        }),
    };
    await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );
}
