import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;

export const TabList = styled(Tabs.Panels)`
    margin-left: 16px;
`;

export const Tab = styled(Tabs.Panel)`
    height: 100%;
    padding-bottom: 50px;
`;

export const WarningBanner = styled.div`
    max-width: 1060px;
    height: 30px;
    background: ${tokens.colors.ui.background__danger.hex};
    color: ${tokens.colors.text.static_icons__default.hex};
    font-size: 14px;
    font-weight: 400, regular;
    margin-left: 8px;
    border-radius: 4px;
`;

export const WarningBannerText = styled.div`
    padding: 8px;
`;
