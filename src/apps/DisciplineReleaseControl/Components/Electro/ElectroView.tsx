import React from 'react';
import { useQuery } from 'react-query';
import { StatusCircle } from '../../../../packages/GardenUtils/src';
import { EleNetwork } from '../../Types/eleNetwork';
import { Pipetest } from '../../Types/pipetest';
import { ElectroNode } from './ElectroNode';
import { getElectroViewCompletionStatusColor, getNodeStatus } from './electroViewHelpers';
import { getEleNetworks } from './getEleNetworks';
import {
    ElectroViewContainer,
    ElectroViewNodeGroupRow,
    ElectroViewNodeText,
    ElectroViewRow,
    SwitchBoardBorderContainer,
    SwitchBoardContainer
} from './styles';

interface ElectroViewProps {
    pipetest: Pipetest;
    pipetests: Pipetest[];
    width: number;
    htCable?: string; //HT cable tagNo if htCable should be the focus of the diagram (HT sidesheet)
}

// If this component gets logic that causes it to need re-renders, it should be rewritten to use more useMemo()/hooks to avoid re-calculating static logic
export const ElectroView = ({
    pipetest,
    pipetests,
    width,
    htCable,
}: ElectroViewProps): JSX.Element => {
    const circuitStarterTagNosArray = pipetest.circuits?.map((c) => c.circuitAndStarterTagNo);
    const circuitStarterTagNos = circuitStarterTagNosArray.toString();

    let { data } = useQuery([circuitStarterTagNos], () => getEleNetworks(circuitStarterTagNos), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    let switchboardArray;

    if (htCable && data) {
        data = data.filter((x) => x.circuits.some((x) => x.tagNo === htCable));
    }

    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            data[i].switchBoardTagNo = circuitStarterTagNosArray[i];
        }

        //Alphabetical sorting
        data?.map((x) => {
            x.circuits.sort((a, b) => a.tagNo?.localeCompare(b?.tagNo));
            x.cables.sort((a, b) => a.tagNo?.localeCompare(b?.tagNo));
            return x;
        });
        //Group by switchboard. One array of EleNetwork to one switchboard.
        switchboardArray = Object.values(
            data?.reduce((acc, item) => {
                const switchboardTagNo = item.switchBoardTagNo.split('-'); //split to find common switchboard tagNo
                acc[switchboardTagNo[0]] = [...(acc[switchboardTagNo[0]] || []), item];
                return acc;
            }, {})
        );
        // Sort circuits
        switchboardArray.forEach((x) =>
            x.sort((a, b) =>
                a?.switchBoardTagNo.split('-')[1]?.localeCompare(b?.switchBoardTagNo.split('-')[1])
            )
        );
        //Sort switchboards
        switchboardArray.sort((a, b) =>
            a[0]?.switchBoardTagNo
                ?.split('-')[0]
                ?.localeCompare(b[0]?.switchBoardTagNo?.split('-')[0])
        );
    }
    return (
        <>
            {pipetest && circuitStarterTagNos !== '' ? (
                <>
                    {!data && <h3 style={{ marginLeft: '8px' }}>Loading circuit diagram...</h3>}
                    <ElectroViewContainer width={width}>
                        {switchboardArray?.map((eleNetworksForSwitchboard: EleNetwork[]) => {
                            const switchboardTagNo =
                                eleNetworksForSwitchboard[0].switchBoardTagNo.split('-');
                            const switchboardStatus = getNodeStatus(
                                eleNetworksForSwitchboard[0].checkLists,
                                switchboardTagNo[0]
                            );
                            return (
                                <SwitchBoardContainer
                                    key={eleNetworksForSwitchboard[0].switchBoardTagNo}
                                >
                                    <SwitchBoardBorderContainer>
                                        <ElectroViewNodeGroupRow>
                                            <ElectroViewNodeText>
                                                {switchboardTagNo[0]}
                                            </ElectroViewNodeText>
                                            <StatusCircle
                                                statusColor={getElectroViewCompletionStatusColor(
                                                    switchboardStatus
                                                )}
                                            />
                                        </ElectroViewNodeGroupRow>
                                        {eleNetworksForSwitchboard?.map(
                                            (eleNetwork: EleNetwork) => {
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
                                                            htCable={htCable}
                                                        />
                                                    </ElectroViewRow>
                                                );
                                            }
                                        )}
                                    </SwitchBoardBorderContainer>
                                </SwitchBoardContainer>
                            );
                        })}
                    </ElectroViewContainer>
                </>
            ) : (
                <h3 style={{ marginLeft: '8px' }}>No circuit diagram found for this pipetest</h3>
            )}
        </>
    );
};
