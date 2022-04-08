import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
