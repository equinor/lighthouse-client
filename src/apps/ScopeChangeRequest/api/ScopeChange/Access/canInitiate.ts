import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function canInitiate(requestId: string): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () => scopeChange.fetch(`api/scope-change-requests/${requestId}`, requestOptions);

    const access = await checkOptionsRequest(check);
    return access.canPatch;
}
