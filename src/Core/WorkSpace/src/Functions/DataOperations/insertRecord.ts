import { QueryCacheArgs } from './queryCacheArgs';

interface InsertRecordParams {
    item: unknown;
}

export function insertRecord<T>(
    { item }: InsertRecordParams,
    { queryApi, queryClient, key }: QueryCacheArgs<T>
): void {
    const query = queryClient.getQueryCache().find(key);
    if (!query || !queryApi.data) return;

    query.setData([item, ...queryApi.data]);
}
