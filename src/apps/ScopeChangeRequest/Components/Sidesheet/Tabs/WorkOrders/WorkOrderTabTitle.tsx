import { CircularProgress } from '@equinor/eds-core-react';
import { useIsFetching } from 'react-query';
import styled from 'styled-components';

const TabTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

export function WorkOrderTabTitle(): JSX.Element {
    const isLoading = useIsFetching({ queryKey: 'WO', active: true }) > 0;

    return (
        <TabTitle>
            Work orders
            {isLoading && <CircularProgress size={16} />}
        </TabTitle>
    );
}
