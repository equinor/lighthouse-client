import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError, TypedSelectOption } from '@equinor/Workflow';
import { Document } from '@equinor/Workflow';
import { transformIsoDate } from '../../../Utils/dateFormatting';

export const fetchBatchDocuments = async (
  documentNos: string[],
  signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
  const { STID } = httpClient();

  const url = `/JCA/documents?includeOfP=true`;
  const requestOptions = {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(documentNos),
    signal: signal,
  };

  const res = await STID.fetch(url, requestOptions);

  if (res.status === 401 || res.status === 403) {
    throw 'User has no access';
  }
  throwOnError(res);

  return (await res.json()).map(
    (x: Document): TypedSelectOption => ({
      label: `${x.docNo} - ${x.docTitle}`,
      value: x.docNo,
      type: 'document',
      searchValue: x.docNo,
      object: x,
      metadata: `Revision ${x.revNo} | Rev date ${
        x.revDate && transformIsoDate(x.revDate)
      } | Reason for issue ${x.reasonForIssue !== null ? x.reasonForIssue : 'NA'}`,
    })
  );
};
