import { httpClient } from '@equinor/portal-client';
import { IdResolverFunc } from '../../../Core/WorkSpace/src';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export async function dataSource(): Promise<ScopeChangeRequest[]> {
    const { scopeChange } = httpClient();
    const response = await scopeChange.fetch(`api/scope-change-requests`);

    return JSON.parse(await response.text());
}

export const idResolver: IdResolverFunc<ScopeChangeRequest> = {
    idResolver: idResolverFunction,
};

async function idResolverFunction(id: string): Promise<ScopeChangeRequest> {
    const { scopeChange } = httpClient();
    return await (await scopeChange.fetch(`api/scope-change-requests/${id}`)).json();
}
