import styled from 'styled-components';

export const Wrapper = styled.div<{ serviceMessageActive: boolean }>`
    position: fixed;
    top: ${({ serviceMessageActive }) => (serviceMessageActive ? 96 : 48)}px;
    height: calc(100vh - ${({ serviceMessageActive }) => (serviceMessageActive ? 96 : 48)}px);
    display: flex;
    width: 100vw;
`;
export const ChildrenWrapper = styled.div<{ sideSheetWidth?: number }>`
    height: 100%;
    width: 100%;
    /* width: calc(100vw - ${({ sideSheetWidth }) => 48 + (sideSheetWidth || 0)}px); */
    transition: width 0.2s ease;
`;
