import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div<{ systemMessageActive: boolean }>`
    position: fixed;
    top: ${({ systemMessageActive }) => (systemMessageActive ? 96 : 48)}px;
    height: calc(100vh - ${({ systemMessageActive }) => (systemMessageActive ? 96 : 48)}px);
    display: flex;
    width: 100vw;
`;
export const ChildrenWrapper = styled.div<{ sideSheetWidth?: number }>`
    height: 100%;
    width: calc(100vw - ${({ sideSheetWidth }) => 48 + (sideSheetWidth || 0)}px);
    transition: width 0.2s ease;
`;
export const MainMenuWrapper = styled.div`
    width: 48px;
    border-right: 1px solid ${tokens.colors.ui.background__medium.rgba};
`;
