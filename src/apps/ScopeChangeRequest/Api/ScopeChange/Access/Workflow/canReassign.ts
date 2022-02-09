import { httpClient } from '../../../../../../Core/Client/Functions/HttpClient';
import { checkOptionsRequest } from '../optionsRequestChecker';

export async function canReassign(
    requestId: string,
    stepId: string,
    criteriaId: string
): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        scopeChange.fetch(
            `api/scope-change-requests/${requestId}/workflow/step/${stepId}/reassign/${criteriaId}`,
            requestOptions
        );

    return (await checkOptionsRequest(check)).canPatch;
}
