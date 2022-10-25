import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const CableGroupWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 110px;
`;

export const DisconnectWrapper = styled.div`
    margin-top: 6px;
    margin-right: 10px;
    height: 24px;
    width: 24px;
`;

export const CableNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    width: 110px;
`;

export const CableInfo = styled.div<{
    borderBottom?: boolean;
    disconnectedCount: number;
    disconnected?: boolean;
    pulled: boolean;
}>`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: ${(p) => 110 - p.disconnectedCount * 9 + 'px'};
    max-height: 15px;
    padding-top: 6px;
    padding-bottom: 3px;
    text-align: center;
    margin-top: ${(p) => (p.borderBottom ? '16px' : null)};
    justify-content: center;
    border-bottom: ${(p) =>
        p.borderBottom
            ? (p.pulled ? '1px solid ' : '1px dashed ') +
              (p.disconnected
                  ? tokens.colors.interactive.warning__resting.hex
                  : tokens.colors.text.static_icons__default.hex)
            : null};
`;

export const DisconnectedStart = styled.div`
    width: 9px;
    margin-left: 4px;
    margin-top: 31px;
`;

export const DisconnectedEnd = styled.div`
    width: 9px;
    margin-right: 4px;
    margin-top: 31px;
`;

export const CrossIconWrapper = styled.div`
    margin-top: 16px;
    margin-left: 4px;
`;
