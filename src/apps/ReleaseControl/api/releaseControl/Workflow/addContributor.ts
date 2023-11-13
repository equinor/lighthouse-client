import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface ContributorBody {
    instructionsToContributor: string;
    oid: string;
}

interface AddContributorParams {
    azureOid: string;
    requestId: string;
    stepId: string;
    contributorTitle: string;
}

export const addContributor = async ({
    azureOid,
    contributorTitle,
    requestId,
    stepId,
}: AddContributorParams): Promise<void> => {
    const { scopeChange } = httpClient();

    const payload: ContributorBody = {
        instructionsToContributor: contributorTitle,
        oid: azureOid,
    };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    const res = await scopeChange.fetch(
        `api/releasecontrol/${requestId}/workflow/step/${stepId}/contributors`,
        requestOptions
    );

    await throwOnError(res);
};
