import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

const TabTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

export function WorkOrderTabTitle(): JSX.Element {
    return (
        <TabTitle>
            Work orders
            {false && <CircularProgress size={16} />}
        </TabTitle>
    );
}
