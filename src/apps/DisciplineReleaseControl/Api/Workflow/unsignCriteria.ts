import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';

interface UnsignCriteriaParams {
    processId: string;
    stepId: string;
    criteriaId: string;
}

/**
 * Unsigns a criteria
 * @param processId
 * @param stepId
 * @param criteriaId
 */
export async function unsignCriteria({
    processId,
    stepId,
    criteriaId,
}: UnsignCriteriaParams): Promise<void> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({}),
    };

    const res = await releaseControls.fetch(
        `api/release-control-processes/${processId}/workflow/step/${stepId}/unsign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(res);
}
