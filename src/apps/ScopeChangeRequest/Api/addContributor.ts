import { BaseClient } from '../../../../packages/httpClient/src';

interface ContributorBody {
    messageToContributor: string;
    oid: string;
}

export const addContributor = async (
    azureOid: string,
    requestId: string,
    stepId: string,
    client: BaseClient
): Promise<void> => {
    const payload: ContributorBody = {
        messageToContributor: '',
        oid: azureOid,
    };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
    };

    await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors`,
            requestOptions
        )
        .then((x) => x.json());
};
