import { httpClient } from '../../../../../../../Core/Client/Functions';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface CanSignParams {
    processId: string;
    stepId: string;
    criteriaId: string;
}

export async function canSign({ criteriaId, processId, stepId }: CanSignParams): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(
            `api/release-control-processes/${processId}/workflow/step/${stepId}/sign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
