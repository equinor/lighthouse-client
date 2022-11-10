import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledSidesheetWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
`;

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
    overflow: hidden;
`;
export const PanelContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
`;
export const SidesheetPanels = styled(Tabs.Panels)`
    overflow: hidden;
`;
export const SidesheetTabs = styled(Tabs)`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
`;
export const StyledPanel = styled(Tabs.Panel)`
    height: 100%;
    width: 100%;
    overflow: auto;
    padding: 0;
`;
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
    height: auto;
`;
