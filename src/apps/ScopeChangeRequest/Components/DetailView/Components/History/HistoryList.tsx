import { useQuery } from 'react-query';

import { LogEntry } from '../../../../Types/scopeChangeRequest';
import { useScopeChangeAccessContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { getHistory } from '../../../../Api/ScopeChange/getHistory';
import { ChevronList } from '../ChevronList/ChevronList';
import { HistoryItem } from './HistoryItem';
import { useEffect } from 'react';

export function HistoryList(): JSX.Element {
    const { request } = useScopeChangeAccessContext();
    const { data, remove, isLoading } = useQuery<LogEntry[]>('history', () =>
        getHistory(request.id)
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
