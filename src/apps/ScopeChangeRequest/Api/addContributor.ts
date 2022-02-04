import { HttpClient } from '@equinor/http-client';

interface ContributorBody {
    instructionsToContributor: string;
    oid: string;
}

export const addContributor = async (
    azureOid: string,
    requestId: string,
    stepId: string,
    client: HttpClient,
    contributorTitle: string
): Promise<void> => {
    const payload: ContributorBody = {
        instructionsToContributor: contributorTitle,
        oid: azureOid,
    };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    await client.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors`,
        requestOptions
    );
};
