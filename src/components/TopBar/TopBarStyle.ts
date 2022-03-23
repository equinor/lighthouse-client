import { TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Icons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    > * {
        margin-left: 1rem;
    }
`;

export const Action = styled.button<{ disabled?: boolean }>`
    background: none;
    border: none;
    color: ${({ disabled }) =>
        disabled
            ? tokens.colors.interactive.disabled__text.rgba
            : tokens.colors.interactive.primary__resting.rgba};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export const TopBarWrapper = styled(TopBar)`
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    > header {
        padding-left: 1.5rem;
    }
`;

export const ActionWrapper = styled.div``;
