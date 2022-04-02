import { LogEntry } from '../../../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { HistoryItem } from './HistoryItem';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { useIsFetching, useQuery } from 'react-query';
import { scopeChangeQueries } from '../../../../Keys/queries';
import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

export function LogTab(): JSX.Element {
    const { request } = useScopeChangeContext();

    const { historyQuery } = scopeChangeQueries;

    const { data } = useQuery<LogEntry[]>({
        ...historyQuery(request.id),
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

export function LogTabTitle(): JSX.Element {
    const { request } = useScopeChangeContext();
    const isLoading =
        useIsFetching(scopeChangeQueries.historyQuery(request.id).queryKey, { active: true }) > 0;

    return (
        <TabTitle>
            Log
            {isLoading && <CircularProgress size={16} />}
        </TabTitle>
    );
}
const TabTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;
