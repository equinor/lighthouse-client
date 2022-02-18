import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface CssProps {
    sideSheetWidth?: number;
}
export const Wrapper = styled.div`
    position: fixed;
    top: 48px;
    height: calc(100vh - 48px);
    display: flex;
    width: 100vw;
`;
export const ChildrenWrapper = styled.div`
    height: 100%;
    width: calc(100vw - ${({ sideSheetWidth }: CssProps) => 48 + (sideSheetWidth || 0)}px);
    transition: width 0.2s ease;
`;
export const MainMenuWrapper = styled.div`
    width: 48px;
    border-right: 1px solid ${tokens.colors.ui.background__medium.rgba};
`;
