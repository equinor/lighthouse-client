import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const HeaderWrapper = styled.section`
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

export const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const RightSection = styled.div`
    display: flex;
    flex-direction: row;
    width: -webkit-fill-available;
    justify-content: end;
`;
export const Line = styled.div`
    width: 100%;
    border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
export const Title = styled(Typography)`
    padding: 1rem 1rem 0 1rem;
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
    font-size: 0.8rem;
`;
