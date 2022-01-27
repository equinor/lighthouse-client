import { httpClient } from '../../../../Core/Client/Functions/HttpClient';

export async function voidRequest(requestId: string): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    await scopeChange.fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/void`,
        requestOptions
    );
}
