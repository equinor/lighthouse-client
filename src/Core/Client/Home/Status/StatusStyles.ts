import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.section`
    margin: 0.5rem;
    height: 800px;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-color: ${tokens.colors.ui.background__light.rgba};

    background-image: url(/images/boat.png);
    background-repeat: no-repeat;
    /* background-size: cover; */
    background-position-x: center;
    background-blend-mode: multiply;
    background-position-y: 60px;
`;

export const Background = styled.section`
    height: 100%;
    width: 100%;
    background-image: url('/images/boat.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
`;
