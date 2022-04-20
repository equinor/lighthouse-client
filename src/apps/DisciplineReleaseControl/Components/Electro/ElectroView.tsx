import React from 'react';
import { useQuery } from 'react-query';
import { EleNetwork } from '../../Types/eleNetwork';
import { Pipetest } from '../../Types/pipetest';
import { ElectroNode } from './ElectroNode';
import { getEleNetworks } from './getEleNetworks';
import {
    ElectroViewContainer,
    ElectroViewNodeText,
    ElectroViewRow,
    SwitchBoardContainer,
} from './styles';

interface ElectroViewProps {
    pipetest: Pipetest;
    pipetests: Pipetest[];
}

export const ElectroView = ({ pipetest, pipetests }: ElectroViewProps): JSX.Element => {
    //Find circuit starter tags from circuits on pipetest
    let circuitStarterTagNos = '';
    const circuitStarterTagNosArray: string[] = [];
    if (pipetest.circuits.length === 0) {
        circuitStarterTagNos = '';
    } else if (pipetest.circuits.length === 1) {
        circuitStarterTagNos = pipetest.circuits[0].circuitAndStarterTagNo;
        circuitStarterTagNosArray.push(pipetest.circuits[0].circuitAndStarterTagNo);
    } else {
        circuitStarterTagNos = pipetest.circuits[0].circuitAndStarterTagNo;
        circuitStarterTagNosArray.push(pipetest.circuits[0].circuitAndStarterTagNo);
        for (let i = 1; i < pipetest.circuits.length; i++) {
            circuitStarterTagNos = circuitStarterTagNos.concat(
                ',' + pipetest.circuits[i].circuitAndStarterTagNo
            );
            circuitStarterTagNosArray.push(pipetest.circuits[i].circuitAndStarterTagNo);
        }
    }

    const { data } = useQuery([circuitStarterTagNos], () => getEleNetworks(circuitStarterTagNos), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    let switchboardArray;

    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            data[i].switchBoardTagNo = circuitStarterTagNosArray[i];
        }

        switchboardArray = Object.values(
            data.reduce((acc, item) => {
                const switchboardTagNo = item.switchBoardTagNo.split('-'); //split to find common switchboard tagNo
                acc[switchboardTagNo[0]] = [...(acc[switchboardTagNo[0]] || []), item];
                return acc;
            }, {})
        );
    }

    return (
        <>
            {pipetest && circuitStarterTagNos !== '' ? (
                <>
                    {!data && <h3>Loading single line diagram...</h3>}
                    <ElectroViewContainer>
                        {switchboardArray?.map((switchboards: EleNetwork[]) => {
                            const switchboardTagNo = switchboards[0].switchBoardTagNo.split('-');
                            return (
                                <SwitchBoardContainer key={switchboards[0].switchBoardTagNo}>
                                    <ElectroViewNodeText>
                                        Switch board {switchboardTagNo[0]}
                                    </ElectroViewNodeText>
                                    {switchboards?.map((eleNetwork: EleNetwork) => {
                                        const startNode = eleNetwork.circuits.find(
                                            (x) => x.parentEleNetId === null
                                        );
                                        return (
                                            <ElectroViewRow key={eleNetwork.eleNetId}>
                                                <ElectroNode
                                                    key={startNode?.eleNetId}
                                                    node={startNode}
                                                    eleNetwork={eleNetwork}
                                                    pipetests={pipetests}
                                                    currentPipetest={pipetest}
                                                />
                                            </ElectroViewRow>
                                        );
                                    })}
                                </SwitchBoardContainer>
                            );
                        })}
                    </ElectroViewContainer>
                </>
            ) : (
                <h3>No single line diagram found for this pipetest</h3>
            )}
        </>
    );
};
