import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Panels = styled(Tabs.Panels)`
    overflow: auto;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
`;
export const Panel = styled(Tabs.Panel)`
    padding: 0;
    height: 100%;
    width: 100%;
`;
