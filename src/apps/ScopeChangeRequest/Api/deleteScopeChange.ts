export async function deleteScopeChange(id: string): Promise<void> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${id}`,
        requestOptions
    );
}
