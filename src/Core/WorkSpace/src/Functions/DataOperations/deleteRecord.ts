import { QueryCacheArgs } from './queryCacheArgs';

interface deleteRecordParams {
    id: string;
    identifier?: string;
}

export function deleteRecord<T>(
    { id, identifier }: deleteRecordParams,
    { objectIdentifier, key, queryApi, queryClient }: QueryCacheArgs<T>
): void {
    const query = queryClient.getQueryCache().find(key);
    if (!query || !queryApi.data) return;

    query.setData(
        queryApi.data.filter((record: any) => record[identifier ?? objectIdentifier] !== id)
    );
}
