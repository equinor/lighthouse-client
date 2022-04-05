import { httpClient } from '../../../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface canUnsignParams {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

export async function canUnsign(
    { requestId, stepId, criteriaId }: canUnsignParams
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/workflow/step/${stepId}/unsign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
