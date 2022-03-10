import { LogEntry } from '../../../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { getHistory } from '../../../../Api/ScopeChange/Request/getHistory';
import { ChevronList } from '../ChevronList/ChevronList';
import { HistoryItem } from './HistoryItem';
import { useEffect } from 'react';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { useScopechangeQueryKeyGen } from '../../../../Hooks/React-Query/useScopechangeQueryKeyGen';
import { useScopeChangeQuery } from '../../../../Hooks/React-Query/useScopeChangeQuery';

export function HistoryList(): JSX.Element {
    const { request } = useScopeChangeContext();

    const { historyKey } = useScopechangeQueryKeyGen(request.id);

    const { data, remove, isLoading } = useScopeChangeQuery<LogEntry[]>(
        historyKey,
        () => getHistory(request.id),
        'Failed to get log',
        {
            cacheTime: CacheTime.FiveMinutes,
            staleTime: CacheTime.FiveMinutes,
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        remove();
    }, [request.id]);

    return (
        <ChevronList title={`Log entries (${isLoading ? '...' : data?.length})`}>
            <>
                {data &&
                    data.map((x) => {
                        return <HistoryItem key={x.id} item={x} />;
                    })}
            </>
        </ChevronList>
    );
}
