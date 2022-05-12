import styled from 'styled-components';
import { StatusCircle } from '@equinor/GardenUtils';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';
import { EleNetworkCable } from '../../../Types/eleNetwork';
import { CableSpiralRight } from './CableSpiralRight';
import { CableSpiralLeft } from './CableSpiralLeft';
import { tokens } from '@equinor/eds-tokens';
import { CheckListStatus } from '../../../Types/drcEnums';

interface CableProps {
    cable: EleNetworkCable;
    status: string;
    borderBottom?: boolean;
}
export const Cable = ({ cable, status, borderBottom }: CableProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            {status === CheckListStatus.OK ? ( //Even if data says cables are disconnected, if status is OK we draw the entire cable.
                <CableInfo borderBottom={borderBottom} disconnectedCount={0}>
                    <ElectroViewNodeValueText>{cable.tagNo}</ElectroViewNodeValueText>
                    <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
                </CableInfo>
            ) : cable.terminatedFromDate === null && cable.terminatedToDate === null ? (
                <CableWrapper>
                    <CableNode>
                        <DisconnectedStart>
                            <CableSpiralLeft />
                        </DisconnectedStart>
                        <CableInfo borderBottom={borderBottom} disconnectedCount={2}>
                            <ElectroViewNodeValueText>{cable.tagNo}</ElectroViewNodeValueText>
                            <StatusCircle
                                statusColor={getElectroViewCompletionStatusColor(status)}
                            />
                        </CableInfo>
                        <DisconnectedEnd>
                            <CableSpiralRight />
                        </DisconnectedEnd>
                    </CableNode>
                </CableWrapper>
            ) : cable.terminatedFromDate === null ? (
                <CableWrapper>
                    <CableNode>
                        <DisconnectedStart>
                            <CableSpiralLeft />
                        </DisconnectedStart>
                        <CableInfo borderBottom={borderBottom} disconnectedCount={1}>
                            <ElectroViewNodeValueText>{cable.tagNo}</ElectroViewNodeValueText>
                            <StatusCircle
                                statusColor={getElectroViewCompletionStatusColor(status)}
                            />
                        </CableInfo>
                    </CableNode>
                </CableWrapper>
            ) : cable.terminatedToDate === null ? (
                <CableWrapper>
                    <CableNode>
                        <CableInfo borderBottom={borderBottom} disconnectedCount={1}>
                            <ElectroViewNodeValueText>{cable.tagNo}</ElectroViewNodeValueText>
                            <StatusCircle
                                statusColor={getElectroViewCompletionStatusColor(status)}
                            />
                        </CableInfo>
                        <DisconnectedEnd>
                            <CableSpiralRight />
                        </DisconnectedEnd>
                    </CableNode>
                </CableWrapper>
            ) : (
                <CableInfo borderBottom={borderBottom} disconnectedCount={0}>
                    <ElectroViewNodeValueText>{cable.tagNo}</ElectroViewNodeValueText>
                    <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
                </CableInfo>
            )}
        </ElectroViewNodeGroup>
    );
};

const CableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
`;

const CableNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    width: 150px;
`;

const CableInfo = styled.div<{
    borderBottom?: boolean;
    disconnectedCount: number;
}>`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: ${(p) => 150 - p.disconnectedCount * 9 + 'px'};
    max-height: 15px;
    padding-top: 6px;
    text-align: center;
    margin-top: ${(p) => (p.borderBottom ? '16px' : null)};
    justify-content: center;
    border-bottom: ${(p) =>
        p.borderBottom ? '1px solid ' + tokens.colors.text.static_icons__default.hex : null};
`;

const DisconnectedStart = styled.div`
    width: 9px;
    margin-left: 4px;
    margin-top: 27px;
`;

const DisconnectedEnd = styled.div`
    width: 9px;
    margin-right: 4px;
    margin-top: 27px;
`;
