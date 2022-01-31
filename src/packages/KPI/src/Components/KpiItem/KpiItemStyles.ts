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
    width: fit-content;
`;
export const Title = styled.div`
    font-size: 13px;
`;

export const Value = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const Description = styled.p`
    color: ${tokens.colors.text.static_icons__secondary.rgba};
    margin-top: 0.5rem;
`;
