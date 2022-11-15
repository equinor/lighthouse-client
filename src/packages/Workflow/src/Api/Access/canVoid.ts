import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function canVoid(
    requestId: string,
    app: string,
    signal?: AbortSignal
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal,
    };

    const check = () => scopeChange.fetch(`api/${app}/${requestId}/void`, requestOptions);

    return (await checkOptionsRequest(check)).canPatch;
}

export async function canUnVoid(
    requestId: string,
    app: string,
    signal?: AbortSignal
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal,
    };

    const check = () => scopeChange.fetch(`api/${app}/${requestId}/unvoid`, requestOptions);

    return (await checkOptionsRequest(check)).canPatch;
}
