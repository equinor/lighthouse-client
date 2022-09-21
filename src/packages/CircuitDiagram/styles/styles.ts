import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const CircuitDiagramContainer = styled.div<{ width: number }>`
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
    margin-bottom: 30px;
`;

export const SwitchBoardBorderContainer = styled.div`
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    padding: 8px;
    width: 100px;
    background: ${tokens.colors.ui.background__light.hex};
`;

export const CircuitDiagramRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 5px;
    padding-top: 5px;
    /* flex-basis: 100% gives us a new row per circuit */
    flex-basis: 100%;
`;

export const CircuitDiagramNodeGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CircuitDiagramNodeGroupRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CircuitDiagramNodeText = styled.div`
    display: flex;
    flex-direction: horizontal;
    font-size: 12px;
    font-weight: 500, Medium;
    margin-left: 4px;
    padding-top: 3px;
    font-variant-numeric: tabular-nums;
`;

export const CircuitDiagramNodeValueText = styled.div<{ clickable?: boolean }>`
    font-size: 12px;
    font-weight: 400, regular;
    margin-left: 4px;
    padding-top: 4px;
    font-variant-numeric: tabular-nums;
    cursor: ${(p) => (p.clickable ? 'pointer' : 'default')};
`;

export const CircuitDiagramHTText = styled.div<{ clickable?: boolean; highlight?: boolean }>`
    font-size: 12px;
    font-weight: 400, regular;
    margin-left: 4px;
    padding-top: 5px;
    font-variant-numeric: tabular-nums;

    background-color: ${(p) =>
        p.highlight ? tokens.colors.interactive.primary__resting.hex : null};
    color: ${(p) => (p.highlight ? tokens.colors.text.static_icons__primary_white.hex : null)};
    cursor: ${(p) => (p.clickable ? 'pointer' : 'default')};
    padding-left: ${(p) => (p.highlight ? '2px' : null)};
    padding-right: ${(p) => (p.highlight ? '2px' : null)};
`;
