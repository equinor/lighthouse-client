import { httpClient } from '../../../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface CanSignParams {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

export async function canSign(
    { criteriaId, requestId, stepId }: CanSignParams,
    signal?: AbortSignal
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal: signal,
    };

    const check = () =>
        scopeChange.fetch(
            `api/releasecontrol/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
