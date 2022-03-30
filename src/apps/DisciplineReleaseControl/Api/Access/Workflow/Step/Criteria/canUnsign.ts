import { httpClient } from '../../../../../../../Core/Client/Functions';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface canUnsignParams {
    processId: string;
    stepId: string;
    criteriaId: string;
}

export async function canUnsign({
    processId,
    stepId,
    criteriaId,
}: canUnsignParams): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(
            `api/release-control-processes/${processId}/workflow/step/${stepId}/unsign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
