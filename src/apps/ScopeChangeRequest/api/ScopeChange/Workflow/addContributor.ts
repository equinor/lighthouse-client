import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';

interface ContributorBody {
    instructionsToContributor: string;
    oid: string;
}

export const addContributor = async (
    azureOid: string,
    requestId: string,
    stepId: string,
    contributorTitle: string
): Promise<void> => {
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
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors`,
        requestOptions
    );

    await throwOnError(res);
};
