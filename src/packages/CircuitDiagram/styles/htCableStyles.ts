import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const HeatTracingCableNode = styled.div<{ pipetestCount: number; disconnected: boolean }>`
    display: flex;
    flex-direction: horizontal;
    padding: 3px;
    padding-top: 6px;
    text-align: center;
    margin-bottom: 2px;
    margin-top: 12px;
    width: ${(p) =>
        p.pipetestCount === 0 || p.pipetestCount === 1
            ? '150px'
            : 45 + 92 * p.pipetestCount + 'px'};
    border-bottom: 2px dashed
        ${(p) =>
            p.disconnected
                ? tokens.colors.interactive.warning__resting.hex
                : tokens.colors.text.static_icons__default.hex};

    &:after {
        content: '';
        background: ${(p) =>
            p.disconnected
                ? tokens.colors.interactive.warning__resting.hex
                : tokens.colors.text.static_icons__default.hex};
        border-radius: 50%;
        width: 10px;
        height: 10px;

        position: relative;
        top: 18px;
        left: ${(p) =>
            p.pipetestCount === 0 || p.pipetestCount === 1
                ? '30px'
                : 92 * p.pipetestCount - 76 + 'px'};
    }
`;

export const Lines = styled.div`
    display: flex;
    flex: 0 0 100%;
`;

export const ABTestDots = styled.div`
    display: flex;
    flex-direction: horizontal;
    width: 50px;
    margin-left: 8px;
`;
