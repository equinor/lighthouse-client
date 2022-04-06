import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest, OptionRequestResult } from './optionsRequestChecker';

export async function getRequestAccess(requestId: string): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () => scopeChange.fetch(`api/scope-change-requests/${requestId}`, requestOptions);

    return await checkOptionsRequest(check);
}
