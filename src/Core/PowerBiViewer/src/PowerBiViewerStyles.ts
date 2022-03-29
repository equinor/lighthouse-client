import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
`;

export const ContentWrapper = styled.div`
    padding-top: 1rem;
    background-color: ${tokens.colors.ui.background__light.rgba};
    height: inherit;
`;
