import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../sFunctions/throwError';

interface ReassignBody {
    type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
    value: string;
}

export interface ReassignCriteriaParameters {
    requestId: string;
    stepId: string;
    criteriaId: string;
    reassign: ReassignBody;
}
export async function reassignCriteria({
    requestId,
    stepId,
    criteriaId,
    reassign,
}: ReassignCriteriaParameters): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(reassign),
    };

    const response = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/reassign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(response);
}
