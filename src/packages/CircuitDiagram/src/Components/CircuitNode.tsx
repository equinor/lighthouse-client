import styled from 'styled-components';

import { Cable, CableNode } from './Cable';
import { CircuitAndStarter } from './CircuitAndStarter';
import { HeatTracingCable } from './HeatTracingCable';
import { JunctionBox } from './JunctionBox';
import { SpaceHeater } from './SpaceHeater';
import {
    getCableChildren,
    getCircuitChildren,
    getCircuitTestStatus,
    getNodeStatus,
} from '../../Utils/circuitDiagramHelpers';
import { CircuitDiagramNodeGroupRow } from '../../styles/styles';
import { CircuitTypes, EleNetwork, EleNetworkCable, EleNetworkCircuit } from '../types/eleNetwork';
import { CheckListStepTag, Pipetest } from '../types/pipetestTypes';

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
}: CircuitNodeProps): JSX.Element => {
    if (node === undefined && cableNode === undefined) return <></>;

    const circuitChildren = getCircuitChildren(eleNetwork, node);
    const cableChildren = getCableChildren(eleNetwork, node);

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

    const remainingChildrenRender =
        isCircuitNode &&
        remainingCableChildren?.map((cable: EleNetworkCable) => {
            return (
                <CircuitNode
                    key={cable?.tagNo}
                    cableNode={cable}
                    eleNetwork={eleNetwork}
                    pipetests={pipetests}
                    currentPipetest={currentPipetest}
                    onGroupeSelect={onGroupeSelect}
                    onSelect={onSelect}
                />
            );
        });

    function getNodeRender(
        node?: EleNetworkCircuit,
        cableNode?: EleNetworkCable,
        cableBorderBottom?: boolean
    ) {
        if (cableNode !== undefined) {
            return <Cable cable={cableNode} status={nodeStatus} borderBottom={cableBorderBottom} />;
        }
        switch (node?.eleSymbolCode) {
            case CircuitTypes.Circuit:
                return (
                    <CircuitAndStarter
                        value={eleNetwork.switchBoardTagNo}
                        cTestStatus={getCircuitTestStatus(
                            CheckListStepTag.HtCTest,
                            eleNetwork.checkLists
                        )}
                    />
                );

            case CircuitTypes.JunctionBox:
                return <JunctionBox value={node?.tagNo} status={nodeStatus} />;
            case CircuitTypes.HTCable:
                return (
                    <HeatTracingCable
                        value={node?.tagNo}
                        eleNetwork={eleNetwork}
                        pipetests={pipetests}
                        currentPipetest={currentPipetest}
                        htCable={htCable}
                        onGroupeSelect={onGroupeSelect}
                        onSelect={onSelect}
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

                {cableChildren.length !== 0 && isCircuitNode && (
                    <CircuitDiagramRow>
                        <CircuitDiagramVerticalRow>
                            <CircuitNode
                                key={firstCable?.tagNo}
                                cableNode={firstCable}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                                cableBorderBottom={true}
                                htCable={htCable}
                                onGroupeSelect={onGroupeSelect}
                                onSelect={onSelect}
                            />
                            {remainingChildrenRender}
                        </CircuitDiagramVerticalRow>

                        <CircuitNode
                            key={circuitFirstCableTo?.tagNo}
                            node={circuitFirstCableTo}
                            eleNetwork={eleNetwork}
                            pipetests={pipetests}
                            currentPipetest={currentPipetest}
                            htCable={htCable}
                            onGroupeSelect={onGroupeSelect}
                            onSelect={onSelect}
                        />
                    </CircuitDiagramRow>
                )}

                {cableChildren.length !== 0 &&
                    !isCircuitNode &&
                    cableChildren.map((cable: EleNetworkCable) => {
                        const cableTo = circuitChildren.find((x) => x.tagNo === cable.tagTo);
                        return (
                            <CircuitDiagramRow key={cable.tagNo}>
                                <CircuitNode
                                    key={cable?.tagNo}
                                    cableNode={cable}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    cableBorderBottom={true}
                                    htCable={htCable}
                                    onGroupeSelect={onGroupeSelect}
                                    onSelect={onSelect}
                                />
                                <CircuitNode
                                    key={cableTo?.tagNo}
                                    node={cableTo}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    htCable={htCable}
                                    onGroupeSelect={onGroupeSelect}
                                    onSelect={onSelect}
                                />
                            </CircuitDiagramRow>
                        );
                    })}

                {/* Render standalone children of the node - HT cable ++ */}
                {standaloneCircuitChildren.length !== 0 &&
                    standaloneCircuitChildren.map((circuit: EleNetworkCircuit) => {
                        return circuit.eleSymbolCode === CircuitTypes.HTCable ? (
                            <CircuitNode
                                key={circuit?.tagNo}
                                node={circuit}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                                htCable={htCable}
                                onGroupeSelect={onGroupeSelect}
                                onSelect={onSelect}
                            />
                        ) : (
                            <CircuitDiagramNodeGroupRow>
                                {/* Ghost cable node to position junction box with no cable correctly */}
                                <CableNode />
                                <CircuitNode
                                    key={circuit?.tagNo}
                                    node={circuit}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    htCable={htCable}
                                    onGroupeSelect={onGroupeSelect}
                                    onSelect={onSelect}
                                />
                            </CircuitDiagramNodeGroupRow>
                        );
                    })}
            </CircuitDiagramVerticalRow>
        </>
    );
};

const CircuitDiagramVerticalRow = styled.div`
    display: flex;
    flex-direction: column;
`;

const CircuitDiagramRow = styled.div`
    display: flex;
    flex-direction: row !important;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;
