import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Modal } from '@equinor/modal';
import { memo, useState } from 'react';
import {
    CircuitAndStarterNode,
    CircuitAndStarterWrapper,
    DeisolateButton,
    IsolateButton,
} from '../../styles/circuitStyles';
import {
    CircuitDiagramNodeGroup,
    CircuitDiagramNodeValueText,
    CircuitDiagramPopover,
    DisconnectedPopover,
} from '../../styles/styles';
import { formatDateString } from '../../Utils/circuitDiagramHelpers';
import { deisolateCircuit } from '../Api/deisolateCircuit';
import { EleNetwork, EleNetworkCable } from '../types/eleNetwork';
import { Pipetest } from '../types/pipetestTypes';
import { CriticalLineVisual } from './CriticalLineVisual';
import { IsolateModal } from './IsolateModal';
import { TestDot } from './TestDot';

interface CircuitAndStarterProps {
    value?: string;
    eleNetwork?: EleNetwork;
    pipetests: Pipetest[];
    cTestStatus: string;
    isEditMode: boolean;
    disconnected: boolean;
    comment: string;
    setComment: (comment: string) => void;
    updateDiagram: (
        updatedCable: EleNetworkCable | undefined,
        updatedCircuit: EleNetwork | undefined,
        circuitTagNo: string
    ) => void;
}
const CircuitAndStarter = ({
    value,
    eleNetwork,
    pipetests,
    cTestStatus,
    isEditMode,
    disconnected,
    comment,
    setComment,
    updateDiagram,
}: CircuitAndStarterProps): JSX.Element => {
    const [isIsolating, setIsIsolating] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const circuitHasCriticalLine = pipetests
        .filter((pipetest) =>
            pipetest.circuits.some((circuit) => circuit.circuitAndStarterTagNo === value)
        )
        .some((x) => x.hasCriticalLine);

    return (
        <>
            <CircuitDiagramNodeGroup>
                <CircuitAndStarterWrapper>
                    <CircuitAndStarterNode disconnected={disconnected}>
                        <CircuitDiagramNodeValueText>
                            <div title={value}>{value?.slice(value.length - 3, value.length)}</div>
                        </CircuitDiagramNodeValueText>
                        <TestDot value="C" status={cTestStatus} />
                        {circuitHasCriticalLine && <CriticalLineVisual />}
                    </CircuitAndStarterNode>

                    {isEditMode && !disconnected && (
                        <div>
                            <IsolateButton
                                onMouseOver={onOpen}
                                onMouseLeave={onClose}
                                onClick={() => setIsIsolating(true)}
                            >
                                <Icon
                                    name={'lock'}
                                    color={tokens.colors.interactive.danger__resting.hex}
                                    size={16}
                                />
                                Isolate
                            </IsolateButton>
                            {isOpen && (
                                <CircuitDiagramPopover>
                                    {'Connected. Click to isolate'}
                                </CircuitDiagramPopover>
                            )}
                        </div>
                    )}
                    {isEditMode && disconnected && (
                        <div>
                            <DeisolateButton
                                onMouseOver={onOpen}
                                onMouseLeave={onClose}
                                onClick={async () => {
                                    const updatedCircuit = await deisolateCircuit(value ?? '');
                                    if (updatedCircuit) {
                                        updateDiagram(undefined, updatedCircuit, value ?? '');
                                    }
                                }}
                            >
                                <Icon
                                    name={'lock'}
                                    color={tokens.colors.ui.background__light.hex}
                                    size={16}
                                />
                                Deisolate
                            </DeisolateButton>
                            {isOpen && (
                                <CircuitDiagramPopover>
                                    {
                                        <DisconnectedPopover>
                                            <div>
                                                Isolated by{' '}
                                                {eleNetwork?.isolatedBy?.firstName +
                                                    ' ' +
                                                    eleNetwork?.isolatedBy?.lastName}{' '}
                                                {formatDateString(eleNetwork?.isolatedDate ?? '')}
                                            </div>
                                            <div>Comment: {eleNetwork?.isolatedComment}</div>
                                            <div>Click to deisolate</div>
                                        </DisconnectedPopover>
                                    }
                                </CircuitDiagramPopover>
                            )}
                        </div>
                    )}
                </CircuitAndStarterWrapper>
            </CircuitDiagramNodeGroup>

            {isEditMode && isIsolating && (
                <Modal
                    title={'Write a comment'}
                    content={
                        <IsolateModal
                            circuitAndStarterTagNo={value ?? ''}
                            setIsIsolating={setIsIsolating}
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

export default memo(CircuitAndStarter);
