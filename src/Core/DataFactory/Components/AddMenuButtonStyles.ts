import { Menu } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
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

    height: 32px;
    padding-top: 12px;
    padding-bottom: 0;
    background: ${({ active }: MenuItemProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};
`;

export const Title = styled.div`
    font-weight: 800;
    display: flex;
    flex-direction: row;
`;
