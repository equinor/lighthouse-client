import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';

interface SubmitContributionParams {
    processId: string;
    stepId: string;
    contributorId: string;
    comment?: string;
}

export async function submitContribution({
    contributorId,
    processId,
    stepId,
    comment,
}: SubmitContributionParams): Promise<void> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            comment: comment,
            suggestion: 'SuggestRejection',
        }),
    };
    const res = await releaseControls.fetch(
        `api/release-control-processes/${processId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
        requestOptions
    );

    await throwOnError(res);
}
