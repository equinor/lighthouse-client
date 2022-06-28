import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
`;

export const ContentWrapper = styled.div`
    background-color: ${tokens.colors.ui.background__light.rgba};
    height: inherit;
`;
