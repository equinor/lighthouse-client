import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    background: ${tokens.colors.ui.background__light.rgba};
    height: -webkit-fill-available;
`;

export const PageWrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
`;
export const Section = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
`;

export const Card = styled.div`
    margin: 1rem;
    padding: 1rem;
    background: #ffffff;
    flex: 1;
`;

export const Main = styled(Card)`
    flex: 2;
    height: 100%;
`;

export const Links = styled(Card)`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: fit-content;
`;

export const Link = styled(RouterLink)`
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    text-decoration: none;
    color: ${tokens.colors.text.static_icons__default.rgba};
    :hover {
        color: ${tokens.colors.interactive.text_highlight.rgba};
        > svg {
            > path {
                fill: ${tokens.colors.interactive.text_highlight.rgba};
            }
        }
    }

    > svg {
        padding-right: 0.5rem;
    }
`;

export const SubTitle = styled(Typography)`
    padding: 0.5rem 0;
`;
