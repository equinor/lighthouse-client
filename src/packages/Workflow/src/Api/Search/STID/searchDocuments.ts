import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../throwOnError';
import { TypedSelectOption } from '../searchType';
import { Document } from '@equinor/Workflow';
import { transformIsoDate } from '../../../Utils/dateFormatting';

export const searchDocuments = async (
  searchString: string,
  facilityId: string,
  signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
  const { STID } = httpClient();

  const uri = `/${facilityId}/documents`;
  const queryParameters = `docNo=${encodeURI(searchString)}&skip=0&take=30&noContentAs200=true`;
  const url = `${uri}?${queryParameters}`;

  const res = await STID.fetch(url, { signal });

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
