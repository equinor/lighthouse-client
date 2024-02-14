import { Button } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const CircuitAndStarterWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const IsolateButton = styled(Button)`
    width: 100px;
    margin-top: 6px;
    color: ${tokens.colors.interactive.danger__resting.hex};
    background: ${tokens.colors.ui.background__default.hex};
    border: 1px solid ${tokens.colors.interactive.danger__resting.hex};

    :hover {
        background: ${tokens.colors.ui.background__light.hex};
        border: 1px solid ${tokens.colors.interactive.danger__resting.hex};
    }
`;

export const DeisolateButton = styled(Button)`
    width: 100px;
    margin-top: 6px;
`;

export const CircuitAndStarterNode = styled.div<{
    disconnected: boolean;
}>`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    border: 1px solid
        ${(p) =>
            p.disconnected
                ? tokens.colors.interactive.warning__resting.hex
                : tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    margin-top: 16px;
    justify-content: center;
    max-height: 40px;
    width: 94px;
    background: ${(p) =>
        p.disconnected
            ? tokens.colors.ui.background__warning.hex
            : tokens.colors.ui.background__default.hex};
`;
