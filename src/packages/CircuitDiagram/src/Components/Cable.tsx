import {
    formatDateString,
    getCircuitDiagramCompletionStatusColor,
} from '../../Utils/circuitDiagramHelpers';
import {
    CircuitDiagramNodeGroup,
    CircuitDiagramNodeValueText,
    CircuitDiagramPopover,
    DisconnectedPopover,
} from '../../styles/styles';
import { CableSpiralRight } from './CableSpiralRight';
import { CableSpiralLeft } from './CableSpiralLeft';
import { tokens } from '@equinor/eds-tokens';
import { EleNetwork, EleNetworkCable } from '../types/eleNetwork';
import { CheckListStatus } from '../types/pipetestTypes';
import { StatusCircle } from './StatusCircle';
import { Checkbox, Icon } from '@equinor/eds-core-react';
import { Modal } from '@equinor/modal';
import { memo, useState } from 'react';
import { DisconnectModal } from './DisconnectModal';
import { reconnectCable } from '../Api/reconnectCable';
import {
    CableGroupWrapper,
    CableInfo,
    CableNode,
    CableWrapper,
    CrossIconWrapper,
    DisconnectedEnd,
    DisconnectedStart,
    DisconnectWrapper,
} from '../../styles/cableStyles';

interface CableProps {
    cable: EleNetworkCable;
    status: string;
    borderBottom?: boolean;
    isEditMode: boolean;
    comment: string;
    setComment: (comment: string) => void;
    updateDiagram: (
        updatedCable: EleNetworkCable | undefined,
        updatedCircuit: EleNetwork | undefined,
        circuitTagNo: string
    ) => void;
    circuitIsolated: boolean;
    parentCircuitTagNo?: string;
}
const Cable = ({
    cable,
    status,
    borderBottom,
    isEditMode,
    comment,
    setComment,
    updateDiagram,
    circuitIsolated,
    parentCircuitTagNo,
}: CableProps): JSX.Element => {
    const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);
    const isPulled = cable.pulledDate !== null;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCableStatusOpen, setIsCableStatusOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onStatusOpen = () => setIsCableStatusOpen(true);
    const onStatusClose = () => setIsCableStatusOpen(false);

    const isFirstCable = parentCircuitTagNo === cable.tagFrom;
    return (
        <>
            <CableGroupWrapper>
                {/* No disconnection option on first cable out of circuit. It would be the same as isolating */}
                {!isFirstCable && isEditMode && cable.disconnected && (
                    <DisconnectWrapper onMouseOver={onOpen} onMouseLeave={onClose}>
                        <Checkbox
                            checked={!cable.disconnected}
                            onChange={async () => {
                                const updatedCable = await reconnectCable(
                                    parentCircuitTagNo ?? '',
                                    cable.tagNo
                                );
                                if (updatedCable) {
                                    updateDiagram(
                                        updatedCable,
                                        undefined,
                                        parentCircuitTagNo ?? ''
                                    );
                                }
                            }}
                            size={12}
                        />
                        {isOpen && (
                            <CircuitDiagramPopover>
                                {
                                    <DisconnectedPopover>
                                        <div>
                                            Disconnected by{' '}
                                            {cable.disconnectedBy?.firstName +
                                                ' ' +
                                                cable.disconnectedBy?.lastName}{' '}
                                            {formatDateString(cable.disconnectedDate ?? '')}
                                        </div>
                                        <div>Comment: {cable.disconnectedComment}</div>
                                        <div>Click to connect</div>
                                    </DisconnectedPopover>
                                }
                            </CircuitDiagramPopover>
                        )}
                    </DisconnectWrapper>
                )}
                {/* Edit mode and no disconnection gives checkbox */}
                {!isFirstCable && isEditMode && !cable.disconnected && (
                    <DisconnectWrapper onMouseOver={onOpen} onMouseLeave={onClose}>
                        <Checkbox
                            checked={!cable.disconnected}
                            onChange={() => {
                                setIsDisconnecting(true);
                            }}
                            size={12}
                        />
                        {isOpen && (
                            <CircuitDiagramPopover>
                                {'Connected. Click to disconnect'}
                            </CircuitDiagramPopover>
                        )}
                    </DisconnectWrapper>
                )}
                {/* No edit mode but disconnected gives X-icon */}
                {!isEditMode && cable.disconnected && (
                    <DisconnectWrapper onMouseOver={onOpen} onMouseLeave={onClose}>
                        <CrossIconWrapper>
                            <Icon
                                name={'close'}
                                color={tokens.colors.interactive.danger__resting.hex}
                                size={24}
                            />
                        </CrossIconWrapper>
                        {isOpen && (
                            <CircuitDiagramPopover>
                                {
                                    <DisconnectedPopover>
                                        <div>
                                            Disconnected by{' '}
                                            {cable.disconnectedBy?.firstName +
                                                ' ' +
                                                cable.disconnectedBy?.lastName}{' '}
                                            {formatDateString(cable.disconnectedDate ?? '')}
                                        </div>
                                        <div>Comment: {cable.disconnectedComment}</div>
                                        {isEditMode && <div>Click to connect</div>}
                                    </DisconnectedPopover>
                                }
                            </CircuitDiagramPopover>
                        )}
                    </DisconnectWrapper>
                )}

                <CircuitDiagramNodeGroup>
                    {status === CheckListStatus.OK ? ( //Even if data says cables are disconnected, if status is OK we draw the entire cable.
                        <CableInfo
                            borderBottom={borderBottom}
                            disconnectedCount={0}
                            disconnected={cable.disconnected || circuitIsolated}
                            pulled={isPulled}
                        >
                            <CircuitDiagramNodeValueText>{cable.tagNo}</CircuitDiagramNodeValueText>
                            <div onMouseOver={onStatusOpen} onMouseLeave={onStatusClose}>
                                <StatusCircle
                                    statusColor={getCircuitDiagramCompletionStatusColor(status)}
                                />
                                {isCableStatusOpen && (
                                    <CircuitDiagramPopover>{status}</CircuitDiagramPopover>
                                )}
                            </div>
                        </CableInfo>
                    ) : isPulled &&
                      cable.terminatedFromDate === null &&
                      cable.terminatedToDate === null ? ( //pulled cable but not terminated in either side (two spirals)
                        <CableWrapper>
                            <CableNode>
                                <DisconnectedStart>
                                    <CableSpiralLeft
                                        isolated={cable.disconnected || circuitIsolated}
                                    />
                                </DisconnectedStart>
                                <CableInfo
                                    borderBottom={borderBottom}
                                    disconnectedCount={2}
                                    disconnected={cable.disconnected || circuitIsolated}
                                    pulled={isPulled}
                                >
                                    <CircuitDiagramNodeValueText>
                                        {cable.tagNo}
                                    </CircuitDiagramNodeValueText>
                                    <div onMouseOver={onStatusOpen} onMouseLeave={onStatusClose}>
                                        <StatusCircle
                                            statusColor={getCircuitDiagramCompletionStatusColor(
                                                status
                                            )}
                                        />
                                        {isCableStatusOpen && (
                                            <CircuitDiagramPopover>{status}</CircuitDiagramPopover>
                                        )}
                                    </div>
                                </CableInfo>
                                <DisconnectedEnd>
                                    <CableSpiralRight
                                        isolated={cable.disconnected || circuitIsolated}
                                    />
                                </DisconnectedEnd>
                            </CableNode>
                        </CableWrapper>
                    ) : isPulled && cable.terminatedFromDate === null ? ( //pulled but not terminated on left side (one spiral)
                        <CableWrapper>
                            <CableNode>
                                <DisconnectedStart>
                                    <CableSpiralLeft
                                        isolated={cable.disconnected || circuitIsolated}
                                    />
                                </DisconnectedStart>
                                <CableInfo
                                    borderBottom={borderBottom}
                                    disconnectedCount={1}
                                    disconnected={cable.disconnected || circuitIsolated}
                                    pulled={isPulled}
                                >
                                    <CircuitDiagramNodeValueText>
                                        {cable.tagNo}
                                    </CircuitDiagramNodeValueText>
                                    <div onMouseOver={onStatusOpen} onMouseLeave={onStatusClose}>
                                        <StatusCircle
                                            statusColor={getCircuitDiagramCompletionStatusColor(
                                                status
                                            )}
                                        />
                                        {isCableStatusOpen && (
                                            <CircuitDiagramPopover>{status}</CircuitDiagramPopover>
                                        )}
                                    </div>
                                </CableInfo>
                            </CableNode>
                        </CableWrapper>
                    ) : isPulled && cable.terminatedToDate === null ? ( //pulled but not terminated to right side (one spiral)
                        <CableWrapper>
                            <CableNode>
                                <CableInfo
                                    borderBottom={borderBottom}
                                    disconnectedCount={1}
                                    disconnected={cable.disconnected || circuitIsolated}
                                    pulled={isPulled}
                                >
                                    <CircuitDiagramNodeValueText>
                                        {cable.tagNo}
                                    </CircuitDiagramNodeValueText>
                                    <div onMouseOver={onStatusOpen} onMouseLeave={onStatusClose}>
                                        <StatusCircle
                                            statusColor={getCircuitDiagramCompletionStatusColor(
                                                status
                                            )}
                                        />
                                        {isCableStatusOpen && (
                                            <CircuitDiagramPopover>{status}</CircuitDiagramPopover>
                                        )}
                                    </div>
                                </CableInfo>
                                <DisconnectedEnd>
                                    <CableSpiralRight
                                        isolated={cable.disconnected || circuitIsolated}
                                    />
                                </DisconnectedEnd>
                            </CableNode>
                        </CableWrapper>
                    ) : (
                        //Terminated both sides. Either solid or dashed cable depending on if it's pulled or not
                        <CableInfo
                            borderBottom={borderBottom}
                            disconnectedCount={0}
                            disconnected={cable.disconnected || circuitIsolated}
                            pulled={isPulled}
                        >
                            <CircuitDiagramNodeValueText>{cable.tagNo}</CircuitDiagramNodeValueText>
                            <div onMouseOver={onStatusOpen} onMouseLeave={onStatusClose}>
                                <StatusCircle
                                    statusColor={getCircuitDiagramCompletionStatusColor(status)}
                                />
                                {isCableStatusOpen && (
                                    <CircuitDiagramPopover>{status}</CircuitDiagramPopover>
                                )}
                            </div>
                        </CableInfo>
                    )}
                </CircuitDiagramNodeGroup>
            </CableGroupWrapper>
            {/* Disconnect modal */}
            {isEditMode && isDisconnecting && (
                <Modal
                    title={'Write a comment'}
                    content={
                        <DisconnectModal
                            circuitTagNo={parentCircuitTagNo ?? ''}
                            cableTagNo={cable.tagNo ?? ''}
                            setIsDisconnecting={setIsDisconnecting}
                            comment={comment}
                            setComment={setComment}
                            updateDiagram={updateDiagram}
                        />
                    }
                />
            )}
        </>
    );
};

export default memo(Cable);
