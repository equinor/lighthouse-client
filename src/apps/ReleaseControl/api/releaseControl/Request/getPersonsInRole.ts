import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';
import { Person } from '../../../types/releaseControl';

export async function getPersonsInRole(role: string, signal?: AbortSignal): Promise<string> {
  const { scopeChange } = httpClient();

  const res = await scopeChange.fetch(`api/functional-role/${role}/get-persons`, { signal });
  await throwOnError(res, 'Failed to fetch data');

  const people = (await res.json()) as Person[];
  if (people.length === 0) {
    return 'No people in this group.';
  }
  return people.map((x) => x.firstName + ' ' + x.lastName).join(', ');
}
