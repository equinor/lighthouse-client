import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '../../../../FamRequestBuilder/src';
import { PunchListItem } from '../../Types/FAMTypes';
import { throwOnError } from '../throwOnError';

const columnNames: string[] = ['PunchItemNo', 'Description'];
const facility = 'JCA';
const view = 'Completion.CompletionPunchItem_v1';


/**
* Keeping double implementation for a while since FAM is experiencing issues from time to time. V2 is the preffered view to avoid stale data. 
*/
export async function searchPunchListItemsV2(
  id: string,
  signal?: AbortSignal
): Promise<PunchListItem[]> {
  const { FAM } = httpClient();

  const res = await FAM.fetch(`v2/dynamic`, {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    signal: signal,
    body: JSON.stringify({
      query: `
SELECT ${columnNames.join(', ')}  FROM ${view} 
WHERE PunchItemNo like '%${id}%' and facility = '${facility}'
ORDER BY facility asc`,
      pagination: {
        skip: 0,
        take: 50,
      },
      options: null,
    }),
  });

  await throwOnError(res, 'Failed to get punch list items');

  const punchListItems: { data: PunchListItem[] } = await res.json();

  if (!Array.isArray(punchListItems.data)) {
    throw 'Invalid response';
  }

  return punchListItems.data;
}

export async function searchPunchListItemsV1(
    id: string,
    signal?: AbortSignal
): Promise<PunchListItem[]> {
    const { FAM } = httpClient();

    const columnNames: string[] = ['PunchItemNo', 'Description'];

    const expressions = generateExpressions('PunchItemNo', 'Like', [id]);

    const requestArgs = generateFamRequest(columnNames, 'Or', expressions, { take: 50, skip: 0 });

    const res = await FAM.fetch(
        'v1/typed/completion/completionPunchItem/facility/JCA?view-version=v1',
        {
            method: 'POST',
            headers: { ['content-type']: 'application/json' },
            body: JSON.stringify(requestArgs),
            signal,
        }
    );

    await throwOnError(res, 'Failed to get punch list items');

    const punchListItems: PunchListItem[] = await res.json();

    if (!Array.isArray(punchListItems)) {
        throw 'Invalid response';
    }

    return punchListItems;
}
