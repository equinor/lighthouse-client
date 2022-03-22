import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../Functions/throwError';

interface SignCriteriaMutation {
    requestId: string;
    stepId: string;
    criteriaId: string;
    verdict: 'Approved' | 'Rejected';
    closeRequest: boolean;
    comment?: string;
}

export async function signCriteria({
    closeRequest,
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
            closeRequest: closeRequest,
        }),
    };

    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflo/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(res);
}
