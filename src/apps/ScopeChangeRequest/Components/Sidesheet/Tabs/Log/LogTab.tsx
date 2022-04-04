import { useQuery } from 'react-query';

import { CacheTime } from '../../../../enum/cacheTimes';
import { scopeChangeQueries } from '../../../../sKeys/queries';
import { LogEntry } from '../../../../sTypes/scopeChangeRequest';
import { HistoryItem } from '../../../DetailView/History/HistoryItem';
import { useScopeChangeContext } from '../../../../context/useScopeChangeAccessContext';

export function LogTab(): JSX.Element {
    const { request } = useScopeChangeContext();

    const { historyQuery } = scopeChangeQueries;

    const { data } = useQuery<LogEntry[]>({
        ...historyQuery(request.id),
        staleTime: CacheTime.FiveMinutes,
    });

    return (
        <>
            {data &&
                data.map((x) => {
                    return <HistoryItem key={x.id} item={x} />;
                })}
        </>
    );
}
