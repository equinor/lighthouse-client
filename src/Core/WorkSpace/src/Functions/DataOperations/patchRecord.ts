import { QueryCacheArgs } from './queryCacheArgs';

interface PatchRecordParams {
    id: string;
    item: unknown;
    identifier?: string;
}

export function patchRecord(
    { id, item, identifier }: PatchRecordParams,
    { queryApi, queryClient, key, objectIdentifier }: QueryCacheArgs
): void {
    const query = queryClient.getQueryCache().find(key);
    if (!query || !queryApi.data) return;

    const patchIndex = queryApi.data.findIndex(
        (record: any) => record[identifier ?? objectIdentifier] === id
    );
    if (patchIndex === -1) return;

    query.setData((queryApi.data[patchIndex] = item));
}
