import { useQuery } from 'react-query';

import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';
import { ChevronList } from '../ChevronList/ChevronList';
import { HistoryItem } from './HistoryItem';
import { useEffect } from 'react';
import { QueryKeys } from '../../../../Api/queryKeys';
import { getHistory } from '../../../../Api/Request/getHistory';
import { LogEntry } from '../../../../Types/disciplineReleaseControl';

export function HistoryList(): JSX.Element {
    const { process } = useReleaseControlContext();
    const { data, remove, isLoading } = useQuery<LogEntry[]>(
        QueryKeys.History,
        () => getHistory(process.id),
        {
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        remove();
    }, [process.id]);

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
