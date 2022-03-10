import { QueryCacheArgs } from './queryCacheArgs';

interface deleteRecordParams {
    id: string;
    identifier?: string;
}

export function deleteRecord(
    { id, identifier }: deleteRecordParams,
    { objectIdentifier, key, queryApi, queryClient }: QueryCacheArgs
): void {
    const query = queryClient.getQueryCache().find(key);
    if (!query || !queryApi.data) return;

    query.setData(
        queryApi.data.filter((record: any) => record[identifier ?? objectIdentifier] !== id)
    );
}
