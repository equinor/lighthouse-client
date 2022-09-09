import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { OptionRequestResult } from '../../../types/query/optionsRequest';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function getRequestAccess(
    requestId: string,
    signal?: AbortSignal
): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal,
    };

    const check = () => scopeChange.fetch(`api/scope-change-requests/${requestId}`, requestOptions);

    return await checkOptionsRequest(check);
}
