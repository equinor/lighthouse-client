import styled from 'styled-components';

export const Wrapper = styled.div<{ serviceMessageActive: boolean }>`
    position: fixed;
    top: ${({ serviceMessageActive }) => (serviceMessageActive ? 107 : 48)}px;
    height: calc(100vh - ${({ serviceMessageActive }) => (serviceMessageActive ? 107 : 48)}px);
    display: flex;
    width: 100vw;
`;
export const ChildrenWrapper = styled.div`
    height: 100%;
    width: 100%;
    transition: width 0.2s ease;
    position: relative;
`;
export const SidesheetWrapper = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
`;
