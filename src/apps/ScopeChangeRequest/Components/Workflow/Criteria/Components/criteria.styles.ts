import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const VerticalLine = styled.div`
    border-left: 1px solid ${tokens.colors.interactive.primary__resting.hex};
    height: 100%;
    width: 1px;
    margin-top: 5px;
`;

export const DetailText = styled.div`
    font-size: 14px;
`;

export const WorklowIconAndLine = styled.div`
    grid-column: col / span 1;
    grid-row: 1 / span 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;
