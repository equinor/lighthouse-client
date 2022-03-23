import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const MainMenuWrapper = styled.div`
    min-width: 310px;
    border-right: 1px solid ${tokens.colors.ui.background__medium.rgba};
    background-color: ${tokens.colors.ui.background__default.rgba};
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const ChildrenWrapper = styled.div<{ sideSheetWidth?: number }>`
    height: 100%;
    width: 100%;
    /* width: calc(100vw - ${({ sideSheetWidth }) => 48 + (sideSheetWidth || 0)}px); */
`;
