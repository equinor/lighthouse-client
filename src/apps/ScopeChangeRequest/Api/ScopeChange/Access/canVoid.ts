import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function canVoid(requestId: string): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(`api/scope-change-requests/${requestId}/void`, requestOptions);

    return (await checkOptionsRequest(check)).canPatch;
}

export async function canUnVoid(requestId: string): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(`api/scope-change-requests/${requestId}/unvoid`, requestOptions);

    return (await checkOptionsRequest(check)).canPatch;
}
