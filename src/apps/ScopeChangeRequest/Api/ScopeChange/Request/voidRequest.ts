import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../Functions/throwError';

interface VoidParams {
    requestId: string;
}

export async function voidRequest({ requestId }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/void`,
        requestOptions
    );

    await throwOnError(res, 'Failed to void request');
}

export async function unVoidRequest({ requestId }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/unvoid`,
        requestOptions
    );

    await throwOnError(res, 'Failed to unvoid request');
}
