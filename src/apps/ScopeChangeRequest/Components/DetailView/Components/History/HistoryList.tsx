import { LogEntry } from '../../../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { HistoryItem } from './HistoryItem';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { useQuery } from 'react-query';
import { scopeChangeQueries } from '../../../../Keys/queries';

export function HistoryList(): JSX.Element {
    const { request } = useScopeChangeContext();

    const { historyQuery } = scopeChangeQueries;

    const { data } = useQuery<LogEntry[]>({
        ...historyQuery(request.id),
        cacheTime: CacheTime.FiveMinutes,
        staleTime: CacheTime.FiveMinutes,
    });

    return (
        // <ChevronList title={`Log entries (${isLoading ? '...' : data?.length})`}>
        <>
            {data &&
                data.map((x) => {
                    return <HistoryItem key={x.id} item={x} />;
                })}
        </>
        // </ChevronList>
    );
}
