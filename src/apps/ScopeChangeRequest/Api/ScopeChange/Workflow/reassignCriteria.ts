import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';

interface ReassignBody {
    type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
    value: string;
}

export async function reassignCriteria(
    requestId: string,
    stepId: string,
    criteriaId: string,
    reassign: ReassignBody
): Promise<void> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(reassign),
    };
    await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/reassign/${criteriaId}`,
        requestOptions
    );
}
