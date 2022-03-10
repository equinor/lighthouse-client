import { QueryCacheArgs } from './queryCacheArgs';

interface GetRecordParams {
    id: string;
    identifier?: string;
}

export function getRecord(
    { id, identifier }: GetRecordParams,
    { objectIdentifier, queryApi }: QueryCacheArgs
) {
    if (!queryApi.data) return;

    return queryApi.data.find((record: any) => record[identifier ?? objectIdentifier] === id);
}
