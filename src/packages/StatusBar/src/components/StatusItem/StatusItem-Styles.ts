import { Card } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface StatusCardProps {
    color: string;
}

export const StatusCard = styled(Card)`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: ${({ color }: StatusCardProps) => `0.25rem solid ${color}`};
    margin: 0.5rem;
`;
export const Title = styled.h4`
    margin: 0;
    padding: 0;
`;

export const Value = styled.h1`
    margin: 0;
    padding: 0;
`;

export const Description = styled.p`
    color: ${tokens.colors.text.static_icons__secondary.rgba};
    margin-top: 0.5rem;
`;
