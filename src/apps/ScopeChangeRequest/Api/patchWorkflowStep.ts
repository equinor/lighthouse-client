export async function patchWorkflowStep(requestId: string): Promise<void> {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/workflow`,
        requestOptions
    );
}
