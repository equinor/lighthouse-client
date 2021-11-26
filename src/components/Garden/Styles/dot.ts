import styled from 'styled-components';

interface DotProps {
    color: string;
}

export const Dot = styled.span`
    height: 1rem;
    width: 1rem;
    background-color: ${(p: DotProps) => p.color};
    border-radius: 50%;
    margin-right: 1em;
`;
