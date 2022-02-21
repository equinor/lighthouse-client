import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const PageWrapper = styled(Tabs.Panels)`
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
export const Page = styled(Tabs.Panel)`
    height: 100%;
`;
