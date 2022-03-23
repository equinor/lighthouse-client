import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';

interface ReassignBody {
    type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
    value: string;
}

export interface ReassignCriteriaParameters {
    processId: string;
    stepId: string;
    criteriaId: string;
    reassign: ReassignBody;
}
export async function reassignCriteria({
    processId,
    stepId,
    criteriaId,
    reassign,
}: ReassignCriteriaParameters): Promise<void> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(reassign),
    };

    const response = await releaseControls.fetch(
        `api/release-control-processes/${processId}/workflow/step/${stepId}/reassign/${criteriaId}`,
        requestOptions
    );

    await throwOnError(response);
}
