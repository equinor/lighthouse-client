import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';

interface VoidParams {
    requestId: string;
    reasonForVoiding: string;
}

export async function voidRequest({ requestId, reasonForVoiding }: VoidParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify({ newRevisionOrVoidReason: reasonForVoiding }),
    };
    const res = await scopeChange.patch(
        `api/scope-change-requests/${requestId}/void`,
        requestOptions
    );

    await throwOnError(res, 'Failed to void request');
}

export async function unVoidRequest({ requestId }: Pick<VoidParams, 'requestId'>): Promise<void> {
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
