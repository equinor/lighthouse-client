import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const WarningTriangleContainer = styled.div`
    margin-left: 5px;
    font-size: 11px;
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    line-height: 14px;
    text-align: center;
    cursor: pointer;
`;

export const WarningTriangleOutline = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent ${tokens.colors.text.static_icons__primary_white.hex}
        transparent;
    border-width: 0 6px 12px 6px;
`;

export const WarningTriangleInner = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    position: relative;
    border-width: 0 4.5px 9px 4.5px;
    border-color: transparent transparent ${tokens.colors.interactive.danger__resting.hex}
        transparent;
    right: 4.5px;
    top: 2.5px;
`;

export const WarningTriangleNoOutline = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent ${tokens.colors.interactive.danger__resting.hex}
        transparent;
    border-width: 0 6px 12px 6px;
    margin-right: 8px;
    padding-top: 4px;
`;

export const CurrentStepContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
