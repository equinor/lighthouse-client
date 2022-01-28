import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest, OptionRequestResult } from './optionsRequestChecker';

export async function canSign(
    requestId: string,
    stepId: string,
    criteriaId: string
): Promise<OptionRequestResult> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
            requestOptions
        );

    return checkOptionsRequest(check);
}
