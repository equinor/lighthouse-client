import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
`;

export const Page = styled.section`
    background-color: ${tokens.colors.ui.background__light.rgba};
    overflow: auto;
    height: 100%;
    width: 100%;
    padding-top: 1rem;
`;
