import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
interface MenuItemProps {
    isLink?: boolean;
    disabled?: boolean;
    active?: boolean;
}

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    justify-content: space-between;
`;

export const Title = styled(Typography)<MenuItemProps>`
    font-size: 14px !important;
    color: ${({ disabled }) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__hover.rgba};
`;

export const IconButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
`;
