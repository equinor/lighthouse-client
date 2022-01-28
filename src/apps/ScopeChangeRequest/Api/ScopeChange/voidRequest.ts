import { httpClient } from '../../../../Core/Client/Functions/HttpClient';

export async function voidRequest(requestId: string): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    await scopeChange.fetch(`api/scope-change-requests/${requestId}/void`, requestOptions);
}

export async function unVoidRequest(requestId: string): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    await scopeChange.fetch(`api/scope-change-requests/${requestId}/unvoid`, requestOptions);
}
