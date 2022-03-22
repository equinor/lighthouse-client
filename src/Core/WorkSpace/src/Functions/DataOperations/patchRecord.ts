import { QueryCacheArgs } from './queryCacheArgs';

interface PatchRecordParams<T> {
    id: string;
    item: T;
    identifier?: string;
}

export function patchRecord<T>(
    { id, item, identifier }: PatchRecordParams<T>,
    { queryApi, queryClient, key, objectIdentifier }: QueryCacheArgs<T>
): void {
    const query = queryClient.getQueryCache().find(key);
    if (!query || !queryApi.data) return;

    const patchIndex = queryApi.data.findIndex(
        (record: any) => record[identifier ?? objectIdentifier] === id
    );
    if (patchIndex === -1) return;

    query.setData([
        ...queryApi.data.slice(0, patchIndex),
        item,
        queryApi.data.slice(patchIndex + 1),
    ]);
}
