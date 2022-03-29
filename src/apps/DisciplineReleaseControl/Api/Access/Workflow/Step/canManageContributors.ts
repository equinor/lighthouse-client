import { httpClient } from '../../../../../../Core/Client/Functions';
import { checkOptionsRequest } from '../../optionsRequestChecker';

interface CanAddContributorParams {
    processId: string;
    stepId: string;
}

export async function canAddContributor({
    processId,
    stepId,
}: CanAddContributorParams): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(
            `api/release-control-processes/${processId}/workflow/step/${stepId}/contributors`,
            requestOptions
        );

    return await (
        await checkOptionsRequest(check)
    ).canPost;
}
