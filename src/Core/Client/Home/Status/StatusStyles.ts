import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.section`
    margin: 0.5rem;
    height: 800px;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-color: ${tokens.colors.ui.background__light.rgba};
    overflow: hidden;
    display: flex;

    /* background-image: url(/images/boat.png);
    background-repeat: no-repeat;

    background-position-x: center;
    background-blend-mode: multiply;
    background-position-y: 60px; */
`;

export const Background = styled.img`
    mix-blend-mode: darken;
    width: 1500px;
`;

export const StatusContent = styled.div`
    position: relative;
    overflow: hidden;
    width: max-content;
    height: fit-content;
    margin: auto auto;
`;
