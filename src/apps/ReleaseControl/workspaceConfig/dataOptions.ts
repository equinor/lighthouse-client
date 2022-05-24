import { httpClient } from '@equinor/lighthouse-portal-client';
import { DataSource, IdResolverFunc } from '@equinor/WorkSpace';
import { ReleaseControl } from '../types/releaseControl';

async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { scopeChange } = httpClient();
    return await scopeChange.fetch(`api/releasecontrol`, {
        signal,
    });
}

export const dataSource: DataSource<ReleaseControl> = {
    responseAsync,
};

export const idResolver: IdResolverFunc<ReleaseControl> = {
    idResolver: idResolverFunction,
};

async function idResolverFunction(id: string): Promise<ReleaseControl> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/releasecontrol/${id}`);

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
}
