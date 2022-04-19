import styled from 'styled-components';
import { CheckListStepTag } from '../../Types/drcEnums';
import { EleNetwork, EleNetworkCable, EleNetworkCircuit } from '../../Types/eleNetwork';
import { Pipetest } from '../../Types/pipetest';
import { Cable } from './Components/Cable';
import { CircuitAndStarter } from './Components/CircuitAndStarter';
import { HeatTracingCable } from './Components/HeatTracingCable';
import { JunctionBox } from './Components/JunctionBox';
import {
    getCableChildren,
    getCircuitChildren,
    getElectroTestStatus,
    getNodeStatus,
} from './electroViewHelpers';

interface ElectroNodeProps {
    eleNetwork: EleNetwork;
    node?: EleNetworkCircuit;
    cableNode?: EleNetworkCable;
    pipetests: Pipetest[];
    currentPipetest: Pipetest;
}

export const ElectroNode = ({
    eleNetwork,
    node,
    cableNode,
    pipetests,
    currentPipetest,
}: ElectroNodeProps): JSX.Element => {
    if (node === undefined && cableNode === undefined) return <></>;

    const circuitChildren = getCircuitChildren(eleNetwork, node);
    const cableChildren = getCableChildren(eleNetwork, node);

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

    function getNodeRender(node?: EleNetworkCircuit, cableNode?: EleNetworkCable) {
        if (cableNode !== undefined) {
            return <Cable value={cableNode?.tagNo} status={nodeStatus} />;
        }
        switch (node?.eleSymbolCode) {
            case 'TAVLE':
                return (
                    <CircuitAndStarter
                        value={eleNetwork.switchBoardTagNo}
                        status={nodeStatus}
                        cTestStatus={getElectroTestStatus(
                            CheckListStepTag.HtCTest,
                            eleNetwork.checkLists
                        )}
                    />
                );

            case 'K_BOX':
                return <JunctionBox value={node?.tagNo} status={nodeStatus} />;
            case 'HT_KAB':
                return (
                    <HeatTracingCable
                        value={node?.tagNo}
                        eleNetwork={eleNetwork}
                        pipetests={pipetests}
                        currentPipetest={currentPipetest}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <>
            {cableNode !== undefined
                ? getNodeRender(undefined, cableNode)
                : getNodeRender(node, undefined)}

            <ElectroViewVerticalRow key={cableNode !== undefined ? cableNode.tagNo : node?.tagNo}>
                {/* Render cables together with their children */}
                {cableChildren.length !== 0 &&
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
                                />
                                <ElectroNode
                                    key={cableTo?.tagNo}
                                    node={cableTo}
                                    eleNetwork={eleNetwork}
                                    pipetests={pipetests}
                                    currentPipetest={currentPipetest}
                                />
                            </ElectroViewRow>
                        );
                    })}
                {/* Render standalone children of the node - HT cable */}
                {standaloneCircuitChildren.length !== 0 &&
                    standaloneCircuitChildren.map((circuit: EleNetworkCircuit) => {
                        return (
                            <ElectroNode
                                key={circuit?.tagNo}
                                node={circuit}
                                eleNetwork={eleNetwork}
                                pipetests={pipetests}
                                currentPipetest={currentPipetest}
                            />
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
