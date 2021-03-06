import { Chip, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
const { Tab } = Tabs;
export const Wrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
    padding: 1rem 0em 1rem 0em;
    gap: 1rem;
`;

export const ChipTab = styled(Chip)`
    margin-right: 0.5rem;
    padding: 0 1.5rem;

    :hover {
        background-color: ${tokens.colors.ui.background__info.rgba};
    }
`;

export const TabTitle = styled.div`
    font-size: 0.8rem;
    padding-right: 0.5rem;
`;
export const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`;
export const Line = styled.div`
    width: -webkit-fill-available;
    border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
export const HeaderTab = styled(Tab)`
    height: 25px;
`;
