import { CircularProgress } from '@equinor/eds-core-react';
import { useIsFetching } from 'react-query';
import styled from 'styled-components';
import { scopeChangeQueries } from '../../../../sKeys/queries';
import { useScopeChangeContext } from '../../../../scontext/useScopeChangeAccessContext';

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
