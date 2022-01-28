import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Heading = styled(Typography)`
    text-align: center;
`;

interface Position {
    x: number;
    y: number;
}

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 0.25rem;
    transform: ${({ x, y }: Position) => `translate(${x}px, ${y}px)`};
`;

interface StatusItemStyleProps {
    background: string;
}

export const Header = styled.div`
    padding: 0.2rem;

    background-color: ${({ background }: StatusItemStyleProps) => background};
`;

export const Content = styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    padding: 0.5rem;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.25rem;
    justify-content: space-around;
    background-color: ${({ background }: StatusItemStyleProps) => background};
`;
