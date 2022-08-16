import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const Wrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: ${tokens.colors.ui.background__light.hsla};
`;

export const TopBar = styled.div<{ height: number }>`
    position: relative;
    display: flex;
    flex-direction: column;
    height: ${(props) => props.height}px;
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
