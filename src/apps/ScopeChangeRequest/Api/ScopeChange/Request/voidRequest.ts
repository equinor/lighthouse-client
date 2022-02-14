import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../Functions/throwError';

export async function voidRequest(requestId: string): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/void`,
        requestOptions
    );

    await throwOnError(res);
}

export async function unVoidRequest(requestId: string): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/unvoid`,
        requestOptions
    );

    await throwOnError(res);
}
