import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function canContribute(
    requestId: string,
    stepId: string,
    contributorId: string
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPost;
}
