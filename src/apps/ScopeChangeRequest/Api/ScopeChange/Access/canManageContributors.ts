import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest, OptionRequestResult } from './optionsRequestChecker';

export async function canInitiate(requestId: string, stepId: string): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/step/${stepId}/contributors`,
            requestOptions
        );

    return await checkOptionsRequest(check);
}
