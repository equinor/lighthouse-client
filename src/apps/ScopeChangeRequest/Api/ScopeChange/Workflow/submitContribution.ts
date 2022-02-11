import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../Functions/throwError';

interface SubmitContributionParams {
    requestId: string;
    stepId: string;
    contributorId: string;
    comment?: string;
}

export async function submitContribution(
    { contributorId, requestId, stepId, comment }: SubmitContributionParams
): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            comment: comment,
            suggestion: 'SuggestRejection',
        }),
    };
    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );

    await throwOnError(res);
}
