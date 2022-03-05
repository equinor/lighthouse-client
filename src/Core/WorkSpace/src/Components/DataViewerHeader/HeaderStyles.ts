import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const HeaderWrapper = styled.section`
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    grid-row: 1/2;
`;

export const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: -webkit-fill-available;
    border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;

export const TitleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
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
