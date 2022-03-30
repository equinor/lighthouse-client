import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';

interface ContributorBody {
    instructionsToContributor: string;
    oid: string;
}

export const addContributor = async (
    azureOid: string,
    processId: string,
    stepId: string,
    contributorTitle: string
): Promise<void> => {
    const { releaseControls } = httpClient();

    const payload: ContributorBody = {
        instructionsToContributor: contributorTitle,
        oid: azureOid,
    };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    const res = await releaseControls.fetch(
        `api/release-control-processes/${processId}/workflow/step/${stepId}/contributors`,
        requestOptions
    );

    await throwOnError(res);
};
