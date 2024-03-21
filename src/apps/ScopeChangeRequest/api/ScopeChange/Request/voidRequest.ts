import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { throwOnError } from '../../../functions/throwError';

interface VoidParams {
  requestId: string;
  reasonForVoiding: string;
}

export async function voidRequest({ requestId, reasonForVoiding }: VoidParams): Promise<void> {
  const { scopeChange } = httpClient();

  const requestOptions: RequestInit = {
    method: 'PATCH',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify({ newRevisionOrVoidReason: reasonForVoiding }),
  };
  const res = await scopeChange.fetchAsync(
    `api/scope-change-requests/${requestId}/void`,
    requestOptions
  );

  await throwOnError(res, 'Failed to void request');
}

export async function unVoidRequest({ requestId }: Pick<VoidParams, 'requestId'>): Promise<void> {
  const { scopeChange } = httpClient();

  const requestOptions = {
    method: 'PATCH',
    headers: { ['content-type']: 'application/json' },
  };
  const res = await scopeChange.fetch(
    `api/scope-change-requests/${requestId}/unvoid`,
    requestOptions
  );

  await throwOnError(res, 'Failed to unvoid request');
}
