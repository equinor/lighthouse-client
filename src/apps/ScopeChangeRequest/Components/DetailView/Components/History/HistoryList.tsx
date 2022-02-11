import { useQuery } from 'react-query';

import { LogEntry } from '../../../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { getHistory } from '../../../../Api/ScopeChange/Request/getHistory';
import { ChevronList } from '../ChevronList/ChevronList';
import { HistoryItem } from './HistoryItem';
import { useEffect } from 'react';
import { QueryKeys } from '../../../../Api/ScopeChange/queryKeys';

export function HistoryList(): JSX.Element {
    const { request } = useScopeChangeContext();
    const { data, remove, isLoading } = useQuery<LogEntry[]>(
        QueryKeys.History,
        () => getHistory(request.id),
        {
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
