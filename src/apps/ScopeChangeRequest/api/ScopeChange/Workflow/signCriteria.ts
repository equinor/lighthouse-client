import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';
import { CriteriaSignState } from '../../../types/scopeChangeRequest';

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
        body: JSON.stringify({
            signedComment: comment,
            signedState: verdict,
        }),
    };

    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(res);
}
