import { httpClient } from '../../../../../../../Core/Client/Functions';
import { checkOptionsRequest } from '../../../optionsRequestChecker';

interface CanContributeParams {
    processId: string;
    stepId: string;
    contributorId: string;
}

export async function canContribute({
    processId,
    stepId,
    contributorId,
}: CanContributeParams): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(
            `api/release-control-processes/${processId}/workflow/step/${stepId}/contributors/${contributorId}/contribute`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPost;
}
