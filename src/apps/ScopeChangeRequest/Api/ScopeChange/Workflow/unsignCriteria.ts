import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';

/**
 * Unsigns a criteria
 * @param requestId
 * @param stepId
 * @param criteriaId
 */
export async function unsignCriteria(
    requestId: string,
    stepId: string,
    criteriaId: string
): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };

    await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/unsign/${criteriaId}`,
        requestOptions
    );
}
