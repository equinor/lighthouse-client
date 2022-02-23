import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Panels = styled(Tabs.Panels)`
    overflow-y: hidden;
    overflow-x: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
export const Panel = styled(Tabs.Panel)`
    height: 100%;
    padding: 0;
`;
