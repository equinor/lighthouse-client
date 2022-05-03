import styled from 'styled-components';
export const Wrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
`;

export const TopBar = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: fit-content;
`;

export const PBIWrapper = styled.div<{ height: number }>`
    padding-top: 1rem;
    overflow: scroll;
    position: absolute;
    top: ${(props) => props.height}px;
    left: 0;
    right: 0;
    bottom: 0;
`;
