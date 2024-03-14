import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';
import { Person } from '../../../types/releaseControl';

export async function getPersonByAzureOid(azureOid: string, signal?: AbortSignal): Promise<string> {
    const { scopeChange } = httpClient();

    const res = await scopeChange.fetch(`api/person/${azureOid}`, { signal });
    await throwOnError(res, 'Failed to fetch data');

    const person = (await res.json()) as Person;
    return person.firstName + ' ' + person.lastName;
}
