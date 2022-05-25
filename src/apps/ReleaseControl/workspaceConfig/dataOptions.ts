import { httpClient } from '@equinor/lighthouse-portal-client';
import { DataSource } from '@equinor/WorkSpace';
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

export async function idResolverFunction(id: string): Promise<ReleaseControl> {
    console.log('here');
    const { scopeChange } = httpClient();
    console.log('here', id);
    const res = await scopeChange.fetch(`api/releasecontrol/${id}`);
    console.log('here2', res);
    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
}
