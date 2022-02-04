import { httpClient } from '../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../optionsRequestChecker';

export async function canAddContributor(requestId: string, stepId: string): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/step/${stepId}/contributors`,
            requestOptions
        );

    return await (
        await checkOptionsRequest(check)
    ).canPost;
}
