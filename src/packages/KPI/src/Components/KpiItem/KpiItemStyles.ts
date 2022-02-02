import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface StatusCardProps {
    color: string;
}

export const StatusCard = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
    align-items: center;
    padding: 0.5em;
    gap: 0.5em;
`;
export const Title = styled.div`
    font-size: 13px;
`;
export const Circle = styled.div<StatusCardProps>`
    height: 0.8em;
    width: 0.8em;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

export const Value = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const Description = styled.p`
    color: ${tokens.colors.text.static_icons__secondary.rgba};
    margin-top: 0.5rem;
`;
