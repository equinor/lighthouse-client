import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';

export async function signCriteria(
    processId: string,
    stepId: string,
    criteriaId: string,
    verdict: 'Approved' | 'Rejected',
    comment?: string
): Promise<void> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
            signedComment: comment,
            signedState: verdict,
        }),
    };

    const res = await releaseControls.fetch(
        `api/release-control-processes/${processId}/workflow/step/${stepId}/sign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(res);
}
