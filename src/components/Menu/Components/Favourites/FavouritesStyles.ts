import { Accordion } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import Icon from '../../../Icon/Icon';

export const Title = styled.pre`
    /* text-decoration: none; */
    /* color: ${tokens.colors.text.static_icons__secondary.rgba};
    flex-grow: 1;
    padding-left: 1rem; */
    width: 100%;
    /* padding: 1rem 0rem; */
`;

const { Header, Panel, Item } = Accordion;

export const FavoriteHeader = styled(Header)`
    > svg {
        padding: 1rem;
    }
    font-size: 13px;
    border: none;
    display: flex;
    justify-content: center;
    padding: 0px;
`;

export const HeaderIcon = styled(Icon)``;

export const FavoritePanel = styled(Panel)`
    padding: 0rem 1rem 0rem 3.5rem;
    border: 0px;
    background-color: transparent;
    min-height: 0;
`;

export const FavoritesItem = styled(Item)`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;
