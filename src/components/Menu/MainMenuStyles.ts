import { Menu } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface MenuItemProps {
    disabled?: boolean;
    active?: boolean;
}

export const MenuItem = styled(Menu.Item)`
    color: ${({ disabled }: MenuItemProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__resting.rgba};
    cursor: ${({ disabled }: MenuItemProps) => (disabled ? 'default' : 'pointer')};

    background: ${({ active }: MenuItemProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};
`;

export const MenuItemLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    width: 100%;
    height: 100%;
`;

export const MenuItemExternalLink = styled.a`
    text-decoration: none;
    color: inherit;

    width: 100%;
    height: 100%;
`;

export const MenuItemTitleLink = styled.div`
    text-decoration: none;
    color: inherit;
    padding: 1rem 1.5rem;
`;
