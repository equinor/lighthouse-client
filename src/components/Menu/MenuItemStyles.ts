import { Menu, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface MenuItemProps {
    isLink?: boolean;
    disabled?: boolean;
    active?: boolean;
}

export const MItem = styled(Menu.Item)`
    color: ${({ disabled }: MenuItemProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__resting.rgba};
    cursor: ${({ disabled }: MenuItemProps) => (disabled ? 'default' : 'pointer')};

    height: 32px;
    padding-top: 12px;
    padding-bottom: 0;
    padding-left: ${({ isLink }: MenuItemProps) => (isLink ? '8px' : '2rem')};
    background: ${({ active }: MenuItemProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};
`;
export const DItem = styled.div`
    color: ${({ disabled }: MenuItemProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
    flex-grow: 1;
    text-decoration: none;
    display: flex;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: ${({ isLink }: MenuItemProps) => (isLink ? '8px' : '2rem')};
    font-size: 16px;
    cursor: ${({ disabled }: MenuItemProps) => (disabled ? 'default' : 'pointer')};
    :hover {
        background-color: ${({ disabled }: MenuItemProps) =>
            disabled ? 'none' : `${tokens.colors.interactive.primary__hover_alt.rgba}`};
    }
    background: ${({ active }: MenuItemProps) =>
        active ? `${tokens.colors.interactive.primary__hover_alt.rgba}` : ''};
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled(Typography)`
    padding-left: 8px;
    font-size: 16px !important;
    color: ${({ disabled }: MenuItemProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
`;
