import { httpClient } from '@equinor/lighthouse-portal-client';
import { DataSource, IdResolverFunc } from '../../../Core/WorkSpace/src';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

async function responseAsync(signal?: AbortSignal): Promise<Response> {
  const { scopeChange } = httpClient();
  return await scopeChange.fetch(`api/scope-change-requests?includeWorkOrdersData=true`, {
    signal: signal,
  });
}

export const dataSource: DataSource<ScopeChangeRequest> = {
  responseAsync,
};

export const idResolver: IdResolverFunc<ScopeChangeRequest> = idResolverFunction;

async function idResolverFunction(id: string): Promise<ScopeChangeRequest> {
  const { scopeChange } = httpClient();
  const res = await scopeChange.fetch(`api/scope-change-requests/${id}`);

  if (!res.ok) {
    throw 'Not found';
  }
  return await res.json();
}
