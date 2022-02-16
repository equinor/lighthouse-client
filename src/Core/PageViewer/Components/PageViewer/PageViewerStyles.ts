import styled from 'styled-components';
import { Tabs } from '@equinor/eds-core-react';

export const TabsWrapper = styled(Tabs)`
    height: 100%;
`;
export const PageViewWrapper = styled.section`
    position: relative;
    height: 90%;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
`;
