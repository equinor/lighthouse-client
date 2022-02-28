import styled from 'styled-components';
import { Tabs as EdsTabs } from '@equinor/eds-core-react';
export const DataViewWrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
    height: 90%;
    position: relative;
`;

export const Tabs = styled(EdsTabs)`
    height: 100%;
`;
