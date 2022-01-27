import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Heading = styled(Typography)`
    text-align: center;
`;

export const Container = styled.div`
    position: absolute;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 0.25rem;
`;

interface StatusItemStyleProps {
    background: string;
}

export const Header = styled.div`
    padding: 1rem;

    background-color: ${({ background }: StatusItemStyleProps) => background};
`;

export const Content = styled.div`
    height: 150px;
    background-color: ${tokens.colors.ui.background__default.rgba};
    opacity: 0.8;
`;
