import Cable from './Cable';
import CircuitAndStarter from './CircuitAndStarter';
import HeatTracingCable from './HeatTracingCable';
import JunctionBox from './JunctionBox';
import SpaceHeater from './SpaceHeater';
import {
    getCableChildren,
    getCircuitChildren,
    getCircuitTestStatus,
    getNodeStatus,
} from '../../Utils/circuitDiagramHelpers';
import {
    CircuitDiagramNodeGroupRow,
    CircuitDiagramNodeRow,
    CircuitDiagramVerticalRow,
} from '../../styles/styles';
import { CircuitTypes, EleNetwork, EleNetworkCable, EleNetworkCircuit } from '../types/eleNetwork';
import { CheckListStepTag, Pipetest } from '../types/pipetestTypes';
import { CableNode } from '../../styles/cableStyles';
import { CircuitDiagramTag } from '../CircuitDiagram';

interface CircuitNodeProps {
    eleNetwork: EleNetwork;
    node?: EleNetworkCircuit;
    cableNode?: EleNetworkCable;
    pipetests: Pipetest[];
    currentPipetest: Pipetest | null;
    cableBorderBottom?: boolean;
    htCable?: string;
    onGroupeSelect?: (item: Record<PropertyKey, unknown>) => void;
    onSelect?: (item: Record<PropertyKey, unknown>) => void;
    isEditMode: boolean;
    disconnected: boolean;
    comment: string;
    onClickEntity?: (clickEvent: CircuitDiagramTag) => void;
    setComment: (comment: string) => void;
    updateDiagram: (
        updatedCable: EleNetworkCable | undefined,
        updatedCircuit: EleNetwork | undefined,
        circuitTagNo: string
    ) => void;
}

export const CircuitNode = ({
    eleNetwork,
    node,
    cableNode,
    pipetests,
    currentPipetest,
    cableBorderBottom,
    htCable,
    onGroupeSelect,
    onSelect,
    isEditMode,
    disconnected,
    comment,
    setComment,
    updateDiagram,
    onClickEntity,
}: CircuitNodeProps): JSX.Element => {
    if (node === undefined && cableNode === undefined) return <></>;

    /* Find circuit and cable children */
    const circuitChildren = getCircuitChildren(eleNetwork, node);
    const cableChildren = getCableChildren(eleNetwork, node);

    /* CircuitAndStarter specific logic to find first and potentially other cables from circuit */
    const isCircuitNode = node?.eleSymbolCode === CircuitTypes.Circuit;
    const remainingCableChildren = cableChildren.slice(1);
    const firstCable = cableChildren[0];
    const circuitFirstCableTo = circuitChildren.find((x) => x.tagNo === firstCable?.tagTo);

    const nodeStatus = getNodeStatus(
        eleNetwork.checkLists,
        node !== undefined ? node?.tagNo : cableNode?.tagNo
    );

    const cablesTo: string[] = [];
    cableChildren?.forEach((x) => {
        cablesTo.push(x.tagTo);
    });

    const standaloneCircuitChildren = circuitChildren.filter(
        (circuit) => !cablesTo.some((x) => x === circuit.tagNo)
    );

    /* Render if there are more than one cable */
    const remainingChildrenRender =
        isCircuitNode &&
        remainingCableChildren?.map((cable: EleNetworkCable) => {
            return (
                <CircuitNode
                    onClickEntity={onClickEntity}
                    key={cable?.tagNo}
                    cableNode={cable}
                    eleNetwork={eleNetwork}
                    pipetests={pipetests}
                    currentPipetest={currentPipetest}
                    onGroupeSelect={onGroupeSelect}
                    onSelect={onSelect}
                    isEditMode={isEditMode}
                    disconnected={disconnected || cable.disconnected === true}
                    comment={comment}
                    setComment={setComment}
                    updateDiagram={updateDiagram}
                />
            );
        });

    /* Get the component to be rendered for the current node */
    function getNodeRender(
        node?: EleNetworkCircuit,
        cableNode?: EleNetworkCable,
        cableBorderBottom?: boolean
    ) {
        if (cableNode !== undefined) {
            return (
                <Cable
                    cable={cableNode}
                    status={nodeStatus}
                    borderBottom={cableBorderBottom}
                    isEditMode={isEditMode}
                    comment={comment}
                    setComment={setComment}
                    updateDiagram={updateDiagram}
                    circuitIsolated={disconnected}
                    parentCircuitTagNo={eleNetwork.circuitAndStarterTagNo}
                />
            );
        }
        switch (node?.eleSymbolCode) {
            case CircuitTypes.Circuit:
                return (
                    <CircuitAndStarter
                        value={eleNetwork.circuitAndStarterTagNo}
                        eleNetwork={eleNetwork}
                        pipetests={pipetests}
                        cTestStatus={getCircuitTestStatus(
                            CheckListStepTag.HtCTest,
                            eleNetwork.checkLists
                        )}
                        isEditMode={isEditMode}
                        disconnected={disconnected || eleNetwork.isolated === true}
                        comment={comment}
                        setComment={setComment}
                        updateDiagram={updateDiagram}
                    />
                );

            case CircuitTypes.JunctionBox:
                return (
                    <JunctionBox
                        value={node?.tagNo}
                        status={nodeStatus}
                        disconnected={disconnected}
                    />
                );
            case CircuitTypes.HTCable:
                return (
                    <HeatTracingCable
                        onClick={() => onClickEntity && onClickEntity({ tagNo: node.tagNo })}
                        value={node?.tagNo}
                        eleNetwork={eleNetwork}
                        pipetests={pipetests}
                        currentPipetest={currentPipetest}
                        htCable={htCable}
                        onGroupeSelect={onGroupeSelect}
                        onSelect={onSelect}
                        disconnected={disconnected}
                    />
                );
            case CircuitTypes.SpaceHeater:
                return <SpaceHeater value={node?.tagNo} status={nodeStatus} />;
            default:
                return null;
        }
    }

    return (
        <>
            {cableNode !== undefined
                ? getNodeRender(undefined, cableNode, cableBorderBottom)
                : getNodeRender(node, undefined, cableBorderBottom)}

            <CircuitDiagramVerticalRow
                key={cableNode !== undefined ? cableNode.tagNo : node?.tagNo}
            >
                {/* Render cables together with their children */}

                {/* If starter circuit node => Renders cable from circuit (and potential other cables) + first circuit (like junction box) */}
                {cableChildren.length !== 0 && isCircuitNode && (
                    <CircuitDiagramNodeRow>
                        <CircuitDiagramVerticalRow>
                            <CircuitNode
                                onClickEntity={onClickEntity}
                                key={firstCable?.tagNo}
                                cableNode={firstCable}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                                cableBorderBottom={true}
                                htCable={htCable}
                                onGroupeSelect={onGroupeSelect}
                                onSelect={onSelect}
                                isEditMode={isEditMode}
                                disconnected={disconnected}
                                comment={comment}
                                setComment={setComment}
                                updateDiagram={updateDiagram}
                            />
                            {remainingChildrenRender}
                        </CircuitDiagramVerticalRow>

                        <CircuitNode
                            onClickEntity={onClickEntity}
                            key={circuitFirstCableTo?.tagNo}
                            node={circuitFirstCableTo}
                            eleNetwork={eleNetwork}
                            pipetests={pipetests}
                            currentPipetest={currentPipetest}
                            htCable={htCable}
                            onGroupeSelect={onGroupeSelect}
                            onSelect={onSelect}
                            isEditMode={isEditMode}
                            disconnected={disconnected}
                            comment={comment}
                            setComment={setComment}
                            updateDiagram={updateDiagram}
                        />
                    </CircuitDiagramNodeRow>
                )}

                {/* If not starter circuit node => renders all cables and circuits (like junction box) from current node */}
                {cableChildren.length !== 0 &&
                    !isCircuitNode &&
                    cableChildren.map((cable: EleNetworkCable) => {
                        const cableTo = circuitChildren.find((x) => x.tagNo === cable.tagTo);
                        return (
                            <CircuitDiagramNodeRow key={cable.tagNo}>
                                <CircuitNode
                                    onClickEntity={onClickEntity}
                                    key={cable?.tagNo}
                                    cableNode={cable}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    cableBorderBottom={true}
                                    htCable={htCable}
                                    onGroupeSelect={onGroupeSelect}
                                    onSelect={onSelect}
                                    isEditMode={isEditMode}
                                    disconnected={disconnected || cable.disconnected === true}
                                    comment={comment}
                                    setComment={setComment}
                                    updateDiagram={updateDiagram}
                                />
                                <CircuitNode
                                    onClickEntity={onClickEntity}
                                    key={cableTo?.tagNo}
                                    node={cableTo}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    htCable={htCable}
                                    onGroupeSelect={onGroupeSelect}
                                    onSelect={onSelect}
                                    isEditMode={isEditMode}
                                    disconnected={disconnected || cable.disconnected === true}
                                    comment={comment}
                                    setComment={setComment}
                                    updateDiagram={updateDiagram}
                                />
                            </CircuitDiagramNodeRow>
                        );
                    })}

                {/* Finally => Render standalone children of the node
                The nodes that have no cables going to them - like HT cable goes out directly from junction box */}
                {standaloneCircuitChildren.length !== 0 &&
                    standaloneCircuitChildren.map((circuit: EleNetworkCircuit) => {
                        return circuit.eleSymbolCode === CircuitTypes.HTCable ? (
                            <CircuitNode
                                onClickEntity={onClickEntity}
                                key={circuit?.tagNo}
                                node={circuit}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                                htCable={htCable}
                                onGroupeSelect={onGroupeSelect}
                                onSelect={onSelect}
                                isEditMode={isEditMode}
                                disconnected={disconnected}
                                comment={comment}
                                setComment={setComment}
                                updateDiagram={updateDiagram}
                            />
                        ) : (
                            <CircuitDiagramNodeGroupRow>
                                {/* Ghost cable node to position junction box with no cable correctly */}
                                <CableNode />
                                <CircuitNode
                                    onClickEntity={onClickEntity}
                                    key={circuit?.tagNo}
                                    node={circuit}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    htCable={htCable}
                                    onGroupeSelect={onGroupeSelect}
                                    onSelect={onSelect}
                                    isEditMode={isEditMode}
                                    disconnected={disconnected}
                                    comment={comment}
                                    setComment={setComment}
                                    updateDiagram={updateDiagram}
                                />
                            </CircuitDiagramNodeGroupRow>
                        );
                    })}
            </CircuitDiagramVerticalRow>
        </>
    );
};
