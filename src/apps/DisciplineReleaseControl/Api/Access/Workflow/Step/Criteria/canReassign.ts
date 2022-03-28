import { httpClient } from '../../../../../../../Core/Client/Functions';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface CanReassignParams {
    processId: string;
    stepId: string;
    criteriaId: string;
}

export async function canReassign({
    criteriaId,
    processId,
    stepId,
}: CanReassignParams): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(
            `api/release-control-processes/${processId}/workflow/step/${stepId}/reassign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
