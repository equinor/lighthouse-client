import { httpClient } from '../../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../../optionsRequestChecker';

interface CanAddContributorParams {
    requestId: string;
    stepId: string;
}

export async function canAddContributor({
    requestId,
    stepId,
}: CanAddContributorParams): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors`,
            requestOptions
        );

    return await (
        await checkOptionsRequest(check)
    ).canPost;
}
