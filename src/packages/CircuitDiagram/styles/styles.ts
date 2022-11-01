import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { PipetestCompletionStatusColors } from '../src';

export const CircuitDiagramWrapper = styled.div<{ width: number }>`
    display: flex;
    flex-direction: column;
    flex: 0 0 100%;
    position: relative;
    flex-wrap: wrap;
    overflow: auto;
    white-space: nowrap;
    max-width: 100%;
    width: ${(p) => (p.width ? p.width : '800px')};
    max-height: ${() => window.innerHeight - 264 + 'px'};
    padding-left: 16px;
`;

export const CircuitDiagramContainer = styled.div<{ width: number }>`
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
    align-items: center;
    flex-wrap: wrap;
    white-space: nowrap;
    width: ${(p) => (p.width ? p.width : '800px')};
    max-width: 100%;
`;

//Filler div to place scrollbar at the bottom of screen
export const CircuitDiagramFillerDiv = styled.div`
    height: 100vh;
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
    width: 110px;
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
    margin-right: 4px;
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

export const CircuitDiagramEditMode = styled.div`
    display: flex;
    position: absolute;
    right: 50px;
    top: 8px;
`;

export const ModalButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5em;
    align-items: center;
    gap: 0.5em;
`;

export const ModalInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;

export const CircuitDiagramPopover = styled.div<{ cornerButton?: boolean }>`
    position: absolute;
    z-index: 100;
    color: #fff;
    background-color: #121212;
    padding: 5px 5px;
    border-radius: 4px;
    margin-top: ${(p) => (p.cornerButton ? '40px' : '10px')};
    right: ${(p) => (p.cornerButton ? '0px' : null)};
`;

export const DisconnectedPopover = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    text-align: center;
`;

export const CircuitDiagramVerticalRow = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CircuitDiagramNodeRow = styled.div`
    display: flex;
    flex-direction: row !important;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

export const TestDotWrapper = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    justify-content: center;
    padding-bottom: 3px;
`;

export const TestDotCircle = styled.div<{ color: string }>`
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
    text-align: center;
    width: 30px;
    height: 16px;
    margin-right: 2px;
    border-radius: 100px;
    background-color: ${(p) => p.color};
    color: ${(p) =>
        p.color === PipetestCompletionStatusColors.OK ||
        p.color === PipetestCompletionStatusColors.PA
            ? tokens.colors.text.static_icons__primary_white.hex
            : tokens.colors.text.static_icons__default.hex};
`;

export const CriticalLineVisualStyle = styled.div`
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
    text-align: center;
    width: 30px;
    height: 14px;
    margin-right: 2px;
    color: ${tokens.colors.interactive.danger__resting.hex};
    background-color: ${tokens.colors.ui.background__light.hex};
    border: 1px solid;
    border-color: ${tokens.colors.interactive.danger__resting.hex};
    margin-left: 8px;
`;

export const TestDotCircleText = styled.div`
    font-size: 16px;
    font-weight: 400, regular;
    cursor: default;
`;

export const JunctionBoxNode = styled.div<{
    disconnected: boolean;
}>`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 60px;
    border: 1px solid
        ${(p) =>
            p.disconnected
                ? tokens.colors.interactive.warning__resting.hex
                : tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    min-height: 60px;
    box-sizing: border-box;
    margin-top: 16px;
    justify-content: center;
`;

export const LineNode = styled.div<{ currentPipetest: boolean; htCable: string | undefined }>`
    flex: 0 0 86px;
    height: 10px;
    border-radius: 10px;
    padding: 7px;
    text-align: center;
    background: ${(p) =>
        p.currentPipetest && !p.htCable
            ? tokens.colors.interactive.primary__resting.hex
            : tokens.colors.ui.background__light.hex};
    color: ${(p) =>
        p.currentPipetest && !p.htCable
            ? tokens.colors.ui.background__light.hex
            : tokens.colors.text.static_icons__default.hex};
    cursor: pointer;
    margin-left: 5px;
    margin-top: 4px;
    font-size: 12px;
`;

export const SpaceHeaterNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 150px;
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    min-height: 60px;
    box-sizing: border-box;
    margin-top: 16px;
    justify-content: center;
`;
