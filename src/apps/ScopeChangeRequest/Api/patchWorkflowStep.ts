export async function patchWorkflowStep(
    requestId: string,
    criteriaId: string,
    comment?: string
): Promise<void> {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            signedComment: comment,
            signedState: 'Approved',
        }),
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/workflow/sign/${criteriaId}`,
        requestOptions
    );
}
