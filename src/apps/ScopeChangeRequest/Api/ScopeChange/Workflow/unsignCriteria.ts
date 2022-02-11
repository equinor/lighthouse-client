import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../Functions/throwError';

interface UnsignCriteriaParams {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

/**
 * Unsigns a criteria
 * @param requestId
 * @param stepId
 * @param criteriaId
 */
export async function unsignCriteria({
    requestId,
    stepId,
    criteriaId,
}: UnsignCriteriaParams): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({}),
    };

    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/unsign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(res);
}
