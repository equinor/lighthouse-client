import { httpClient } from '../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../optionsRequestChecker';

export async function canSign(
    requestId: string,
    stepId: string,
    criteriaId: string
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
