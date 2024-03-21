import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';

type TagUrlId = {
  urlId: string;
};

const tagColumns = ['urlId'];

export async function getTagUrl(
  tagNo: string | undefined,
  signal: AbortSignal | undefined
): Promise<string | null> {
  if (tagNo === undefined) {
    return null;
  }

  const { FAM } = httpClient();
  const expressions = generateExpressions('tagNo', 'Equals', [tagNo]);
  const requestArgs = generateFamRequest(tagColumns, 'Or', expressions);
  const res = await FAM.fetch(`v1/typed/Completion/CompletionTag/facility/JCA?view-version=v3`, {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(requestArgs),
    signal,
  });

  const tagUrlId: TagUrlId[] = await res.json();

  if (!Array.isArray(tagUrlId)) {
    throw new Error('Invalid response');
  }

  const tagUrl = `https://procosys.equinor.com/JOHAN_CASTBERG/Completion#Tag|${tagUrlId[0].urlId}`;
  return tagUrl;
}
