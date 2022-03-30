import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const AppGroup = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0rem 1rem 1rem 1rem;
    min-width: 200px;
`;

interface MenuItemProps {
    isLink?: boolean;
    disabled?: boolean;
    active?: boolean;
}

export const Item = styled.div<MenuItemProps>`
    color: ${({ disabled }) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
    flex-grow: 1;
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 23px;
    width: 240px;
    font-size: 14px;

    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    :hover {
        background-color: ${({ disabled }) =>
            disabled ? 'none' : `${tokens.colors.interactive.primary__hover_alt.rgba}`};
    }
    background: ${({ active }) =>
        active ? `${tokens.colors.interactive.primary__selected_highlight.rgba}` : ''};
`;
