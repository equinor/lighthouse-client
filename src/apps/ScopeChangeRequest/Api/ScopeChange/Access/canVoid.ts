import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest, OptionRequestResult } from './optionsRequestChecker';

export async function canVoid(requestId: string): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(`api/scope-change-requests/${requestId}/void`, requestOptions);

    return checkOptionsRequest(check);
}

export async function canUnVoid(requestId: string): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(`api/scope-change-requests/${requestId}/unvoid`, requestOptions);

    return checkOptionsRequest(check);
}
