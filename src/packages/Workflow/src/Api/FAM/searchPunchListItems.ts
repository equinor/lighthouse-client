import { httpClient } from '@equinor/lighthouse-portal-client';
import { PunchListItem } from '../../Types/FAMTypes';
import { throwOnError } from '../throwOnError';

const columnNames: string[] = ['PunchItemNo', 'Description'];
const facility = "JCA"
const view = "Completion.CompletionPunchItem_v1"
export async function searchPunchListItems(
  id: string,
  signal?: AbortSignal
): Promise<PunchListItem[]> {
  const { FAM } = httpClient();

  const res = await FAM.fetch(`v2/dynamic`, {
    method: "POST",
    headers: { ["content-type"]: "application/json" },
    signal: signal,
    body: JSON.stringify({
      query: `
SELECT ${columnNames.join(", ")}  FROM ${view} 
WHERE PunchItemNo like '%${id}%' and facility = '${facility}'
ORDER BY facility asc`,
      pagination: {
        skip: 0,
        take: 50
      },
      options: null
    })
  })

  await throwOnError(res, 'Failed to get punch list items');

  const punchListItems: { data: PunchListItem[] } = await res.json();

  if (!Array.isArray(punchListItems.data)) {
    throw 'Invalid response';
  }

  return punchListItems.data;
}
