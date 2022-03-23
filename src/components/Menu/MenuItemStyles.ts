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

    height: 26px;
    padding-top: 8px;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    p {
        font-size: 14px !important;
    }
    padding-left: ${({ isLink }: MenuItemProps) => (isLink ? '8px' : '1.5rem')};
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
    align-items: center;
    padding-bottom: 0.25rem;
    padding-top: 0.25rem;

    p {
        font-size: 14px !important;
    }
    cursor: ${({ disabled }: MenuItemProps) => (disabled ? 'default' : 'pointer')};
    :hover {
        background-color: ${({ disabled }: MenuItemProps) =>
            disabled ? 'none' : `${tokens.colors.interactive.primary__hover_alt.rgba}`};
    }
    background: ${({ active }: MenuItemProps) =>
        active ? `${tokens.colors.interactive.primary__hover.rgba}` : ''};
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    justify-content: space-between;
`;
export const Title = styled(Typography)`
    font-size: 16px !important;
    color: ${({ disabled }: MenuItemProps) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
`;
