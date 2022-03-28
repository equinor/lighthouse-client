import { httpClient } from '@equinor/portal-client';
import { DataSource, IdResolverFunc } from '../../../Core/WorkSpace/src';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { scopeChange } = httpClient();
    return await scopeChange.fetch(`api/scope-change-requests`, {
        signal: signal,
    });
}

export const dataSource: DataSource<ScopeChangeRequest> = {
    responseAsync,
};

export const idResolver: IdResolverFunc<ScopeChangeRequest> = {
    idResolver: idResolverFunction,
};

async function idResolverFunction(id: string): Promise<ScopeChangeRequest> {
    const { scopeChange } = httpClient();
    return await (await scopeChange.fetch(`api/scope-change-requests/${id}`)).json();
}
