import { httpClient } from '../../../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface CanContributeParams {
    requestId: string;
    stepId: string;
    contributorId: string;
    signal?: AbortSignal;
}

export async function canContribute({
    requestId,
    stepId,
    contributorId,
    signal,
}: CanContributeParams): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal: signal,
    };

    const check = () =>
        scopeChange.fetch(
            `api/releasecontrol/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPost;
}
