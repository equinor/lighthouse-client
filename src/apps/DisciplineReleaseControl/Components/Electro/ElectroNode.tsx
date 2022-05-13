import styled from 'styled-components';
import { CheckListStepTag } from '../../Types/drcEnums';
import {
    CircuitTypes,
    EleNetwork,
    EleNetworkCable,
    EleNetworkCircuit,
} from '../../Types/eleNetwork';
import { Pipetest } from '../../Types/pipetest';
import { Cable, CableNode } from './Components/Cable';
import { CircuitAndStarter } from './Components/CircuitAndStarter';
import { HeatTracingCable } from './Components/HeatTracingCable';
import { JunctionBox } from './Components/JunctionBox';
import { SpaceHeater } from './Components/SpaceHeater';
import {
    getCableChildren,
    getCircuitChildren,
    getElectroTestStatus,
    getNodeStatus,
} from './electroViewHelpers';
import { ElectroViewNodeGroupRow } from './styles';

interface ElectroNodeProps {
    eleNetwork: EleNetwork;
    node?: EleNetworkCircuit;
    cableNode?: EleNetworkCable;
    pipetests: Pipetest[];
    currentPipetest: Pipetest;
    cableBorderBottom?: boolean;
    htCable?: string;
}

export const ElectroNode = ({
    eleNetwork,
    node,
    cableNode,
    pipetests,
    currentPipetest,
    cableBorderBottom,
    htCable,
}: ElectroNodeProps): JSX.Element => {
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
                <ElectroNode
                    key={cable?.tagNo}
                    cableNode={cable}
                    eleNetwork={eleNetwork}
                    pipetests={pipetests}
                    currentPipetest={currentPipetest}
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
                        cTestStatus={getElectroTestStatus(
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

            <ElectroViewVerticalRow key={cableNode !== undefined ? cableNode.tagNo : node?.tagNo}>
                {/* Render cables together with their children */}

                {cableChildren.length !== 0 && isCircuitNode && (
                    <ElectroViewRow>
                        <ElectroViewVerticalRow>
                            <ElectroNode
                                key={firstCable?.tagNo}
                                cableNode={firstCable}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                                cableBorderBottom={true}
                                htCable={htCable}
                            />
                            {remainingChildrenRender}
                        </ElectroViewVerticalRow>

                        <ElectroNode
                            key={circuitFirstCableTo?.tagNo}
                            node={circuitFirstCableTo}
                            eleNetwork={eleNetwork}
                            pipetests={pipetests}
                            currentPipetest={currentPipetest}
                            htCable={htCable}
                        />
                    </ElectroViewRow>
                )}

                {cableChildren.length !== 0 &&
                    !isCircuitNode &&
                    cableChildren.map((cable: EleNetworkCable) => {
                        const cableTo = circuitChildren.find((x) => x.tagNo === cable.tagTo);
                        return (
                            <ElectroViewRow key={cable.tagNo}>
                                <ElectroNode
                                    key={cable?.tagNo}
                                    cableNode={cable}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    cableBorderBottom={true}
                                    htCable={htCable}
                                />
                                <ElectroNode
                                    key={cableTo?.tagNo}
                                    node={cableTo}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    htCable={htCable}
                                />
                            </ElectroViewRow>
                        );
                    })}

                {/* Render standalone children of the node - HT cable ++ */}
                {standaloneCircuitChildren.length !== 0 &&
                    standaloneCircuitChildren.map((circuit: EleNetworkCircuit) => {
                        return circuit.eleSymbolCode === CircuitTypes.HTCable ? (
                            <ElectroNode
                                key={circuit?.tagNo}
                                node={circuit}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                                htCable={htCable}
                            />
                        ) : (
                            <ElectroViewNodeGroupRow>
                                {/* Ghost cable node to position junction box with no cable correctly */}
                                <CableNode />
                                <ElectroNode
                                    key={circuit?.tagNo}
                                    node={circuit}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                    htCable={htCable}
                                />
                            </ElectroViewNodeGroupRow>
                        );
                    })}
            </ElectroViewVerticalRow>
        </>
    );
};

const ElectroViewVerticalRow = styled.div`
    display: flex;
    flex-direction: column;
`;

const ElectroViewRow = styled.div`
    display: flex;
    flex-direction: row !important;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;
