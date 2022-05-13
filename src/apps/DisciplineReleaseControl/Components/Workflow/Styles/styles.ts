import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const WarningTriangleContainer = styled.div`
    font-size: 11px;
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    text-align: center;
    cursor: pointer;
    width: 16px;
    height: 14px;
`;

export const CurrentStepContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
