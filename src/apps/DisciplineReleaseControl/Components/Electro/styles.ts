import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ElectroViewContainer = styled.div<{ width: number }>`
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    overflow: auto;
    white-space: nowrap;
    max-width: 100%;
    width: ${(p) => (p.width ? p.width : '800px')};
    max-height: ${() => window.innerHeight - 378 + 'px'};
    overflow-x: auto;
    overflow-y: auto;
    padding-left: 16px;
`;

export const SwitchBoardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    white-space: nowrap;
    max-width: 100%;
    margin-bottom: 50px;
`;

export const SwitchBoardBorderContainer = styled.div`
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    padding: 8px;
    width: 100px;
    background: ${tokens.colors.ui.background__light.hex};
`;

export const ElectroViewRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    padding-top: 10px;
    /* flex-basis: 100% gives us a new row per circuit */
    flex-basis: 100%;
`;

export const ElectroViewNodeGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ElectroViewNodeGroupRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ElectroViewNodeText = styled.div`
    display: flex;
    flex-direction: horizontal;
    font-size: 16px;
    font-weight: 500, Medium;
    margin-left: 4px;
`;

export const ElectroViewNodeValueText = styled.div<{ clickable?: boolean }>`
    font-size: 16px;
    font-weight: 400, regular;
    margin-left: 5px;
    cursor: ${(p) => (p.clickable ? 'pointer' : 'default')};
`;

export const ElectroViewHTHighlight = styled.div`
    font-size: 16px;
    font-weight: 400, regular;
    margin-left: 5px;
    cursor: pointer;
    padding: 1px;
    background-color: ${tokens.colors.interactive.primary__resting.hex};
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    font-variant-numeric: tabular-nums;
`;
