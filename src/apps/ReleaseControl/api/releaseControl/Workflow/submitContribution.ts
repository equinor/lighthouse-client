import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface SubmitContributionParams {
    requestId: string;
    stepId: string;
    contributorId: string;
    suggestion: Suggestion;
    comment?: string;
}

type Suggestion = 'Comment' | 'SuggestRejection' | 'SuggestApproval';

export async function submitContribution({
    contributorId,
    requestId,
    stepId,
    suggestion,
    comment,
}: SubmitContributionParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            comment: comment,
            suggestion: suggestion,
        }),
    };
    const res = await scopeChange.fetch(
        `api/releasecontrol/${requestId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );

    await throwOnError(res);
}
