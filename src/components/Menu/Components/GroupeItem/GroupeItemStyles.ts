import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface ItemProps {
    disabled?: boolean;
    active?: boolean;
}

export const Item = styled.div<ItemProps>`
    color: ${({ disabled }) =>
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
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    :hover {
        background-color: ${({ disabled }) =>
            disabled ? 'none' : `${tokens.colors.interactive.primary__hover_alt.rgba}`};
    }
    background: ${({ active }) =>
        active ? `${tokens.colors.interactive.primary__hover.rgba}` : ''};
`;
