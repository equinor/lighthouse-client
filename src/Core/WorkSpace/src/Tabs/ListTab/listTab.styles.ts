import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledTabWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding-top: 1em;
`;

export const StyledLine = styled.div`
    background-color: ${tokens.colors.interactive.pressed_overlay_dark.hsla};
    height: 2px;
    width: 98%;
`;
