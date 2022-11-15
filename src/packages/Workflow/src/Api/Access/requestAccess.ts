import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest, OptionRequestResult } from './optionsRequestChecker';

export async function getRequestAccess(
    requestId: string,
    app: string,
    signal?: AbortSignal
): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal,
    };

    const check = () => scopeChange.fetch(`api/${app}/${requestId}`, requestOptions);

    return await checkOptionsRequest(check);
}
