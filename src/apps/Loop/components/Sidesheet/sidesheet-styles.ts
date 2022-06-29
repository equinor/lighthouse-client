import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ItemLink = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: none;
    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
export const TabsWrapper = styled.div`
    height: 100%;
`;
export const PanelContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
export const SidesheetPanels = styled(Tabs.Panels)``;
export const SidesheetTabs = styled(Tabs)`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
`;
export const OverviewPanel = styled(Tabs.Panel)`
    padding: 1em;
    height: 83%;
    overflow-y: auto;
    overflow-x: hidden;
`;
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
