import { httpClient } from '@equinor/lighthouse-portal-client';
import { CriteriaSignState } from '@equinor/Workflow';
import { throwOnError } from '../../../functions/throwError';

interface SignCriteriaMutation {
    requestId: string;
    stepId: string;
    criteriaId: string;
    verdict: CriteriaSignState;
    comment?: string;
}

export async function signCriteria({
    criteriaId,
    requestId,
    stepId,
    verdict,
    comment,
}: SignCriteriaMutation): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify({
            signedComment: comment,
            signedState: verdict,
        }),
    };

    const res = await scopeChange.fetch(
        `api/releasecontrol/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(res);
}
