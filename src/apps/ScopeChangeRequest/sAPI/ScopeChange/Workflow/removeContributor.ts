import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../sFunctions/throwError';

interface RemoveContributorParams {
    requestId: string;
    stepId: string;
    contributorId: string;
}

export const removeContributor = async ({
    contributorId,
    requestId,
    stepId,
}: RemoveContributorParams): Promise<void> => {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'DELETE',
    };

    const res = await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/workflow/step/${stepId}/contributors/${contributorId}`,
        requestOptions
    );

    await throwOnError(res);
};
