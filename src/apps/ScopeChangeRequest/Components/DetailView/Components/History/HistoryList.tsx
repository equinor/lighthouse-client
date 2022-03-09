import { useQuery } from 'react-query';

import { LogEntry } from '../../../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { getHistory } from '../../../../Api/ScopeChange/Request/getHistory';
import { ChevronList } from '../ChevronList/ChevronList';
import { HistoryItem } from './HistoryItem';
import { useEffect } from 'react';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { useScopechangeQueryKeyGen } from '../../../../Hooks/React-Query/useScopechangeQueryKeyGen';

export function HistoryList(): JSX.Element {
    const { request } = useScopeChangeContext();

    const { historyKey } = useScopechangeQueryKeyGen(request.id);

    const { data, remove, isLoading } = useQuery<LogEntry[]>(
        historyKey,
        () => getHistory(request.id),
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
