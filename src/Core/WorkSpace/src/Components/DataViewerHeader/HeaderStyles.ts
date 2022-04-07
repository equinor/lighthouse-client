import { Tabs, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
`;

export const TitleBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: -webkit-fill-available;
`;

export const ActionBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: -webkit-fill-available;
`;

export const LeftSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: -webkit-fill-available;
`;

export const RightSection = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Title = styled(Typography)`
    padding: 1rem;
`;

export const Divider = styled.div`
    padding: 0.5rem;
    border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};

    ::before {
        content: ' ';
        display: block;
        width: 2px;
        height: 30px;
        background: ${tokens.colors.ui.background__medium.rgba};
    }
`;

export const TabTitle = styled.span`
    padding-left: 0.5rem;
    font-size: 16px;
`;
const { Tab } = Tabs;

export const HeaderTab = styled(Tab)`
    overflow-x: visible;
`;

export const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
    border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
    box-sizing: border-box;
`;
