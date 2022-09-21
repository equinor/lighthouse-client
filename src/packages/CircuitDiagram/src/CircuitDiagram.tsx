import { useQuery } from 'react-query';
import { CircuitNode } from './Components/CircuitNode';
import {
    getCircuitDiagramCompletionStatusColor,
    getNodeStatus,
} from '../Utils/circuitDiagramHelpers';
import {
    CircuitDiagramContainer,
    CircuitDiagramNodeGroupRow,
    CircuitDiagramNodeText,
    CircuitDiagramRow,
    SwitchBoardBorderContainer,
    SwitchBoardContainer,
} from '../styles/styles';
import { EleNetwork } from './types/eleNetwork';
import { getEleNetworks } from './Api/getEleNetworks';
import { Pipetest } from './types/pipetestTypes';
import { NoCircuitDiagramFound } from './Components/NoCircuitDiagramFound';
import { StatusCircle } from './Components/StatusCircle';

interface CircuitDiagramProps {
    pipetest: Pipetest | null;
    pipetests: Pipetest[];
    width: number;
    /* HT cable tagNo if htCable should be the focus of the diagram (HT sidesheet) */
    htCable?: string;
    /* list of circuitAndStarterTagNos to fetch eleNetworks from and display */
    circuitAndStarterTagNos: string[];
    onGroupeSelect?: (item: Record<PropertyKey, unknown>) => void;
    onSelect?: (item: Record<PropertyKey, unknown>) => void;
}

// If this component gets logic that causes it to need re-renders, it should be rewritten to use more useMemo()/hooks to avoid re-calculating static logic
export const CircuitDiagram = ({
    pipetest,
    pipetests,
    width,
    htCable,
    circuitAndStarterTagNos,
    onGroupeSelect,
    onSelect,
}: CircuitDiagramProps): JSX.Element => {
    const circuitStarterTagNoString = circuitAndStarterTagNos?.toString();

    let { data } = useQuery(
        [circuitStarterTagNoString],
        () => getEleNetworks(circuitStarterTagNoString ?? ''),
        {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    if (circuitStarterTagNoString === '' || circuitStarterTagNoString === undefined) {
        return (
            <NoCircuitDiagramFound
                htCable={htCable !== undefined}
                releaseControl={pipetest === null}
            />
        );
    }

    let switchboardArray;

    if (htCable && data) {
        data = data.filter((x) => x.circuits.some((x) => x.tagNo === htCable));
    }

    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            data[i].switchBoardTagNo = circuitAndStarterTagNos[i];
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
            {circuitStarterTagNoString !== '' ? (
                <>
                    {!data && <h3 style={{ marginLeft: '8px' }}>Loading circuit diagram...</h3>}
                    <CircuitDiagramContainer width={width}>
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
                                        <CircuitDiagramNodeGroupRow>
                                            <CircuitDiagramNodeText>
                                                {switchboardTagNo[0]}
                                            </CircuitDiagramNodeText>
                                            <StatusCircle
                                                statusColor={getCircuitDiagramCompletionStatusColor(
                                                    switchboardStatus
                                                )}
                                            />
                                        </CircuitDiagramNodeGroupRow>
                                        {eleNetworksForSwitchboard?.map(
                                            (eleNetwork: EleNetwork) => {
                                                const startNode = eleNetwork.circuits.find(
                                                    (x) => x.parentEleNetId === null
                                                );
                                                return (
                                                    <CircuitDiagramRow key={eleNetwork.eleNetId}>
                                                        <CircuitNode
                                                            key={startNode?.eleNetId}
                                                            node={startNode}
                                                            eleNetwork={eleNetwork}
                                                            pipetests={pipetests}
                                                            currentPipetest={pipetest}
                                                            htCable={htCable}
                                                            onGroupeSelect={onGroupeSelect}
                                                            onSelect={onSelect}
                                                        />
                                                    </CircuitDiagramRow>
                                                );
                                            }
                                        )}
                                    </SwitchBoardBorderContainer>
                                </SwitchBoardContainer>
                            );
                        })}
                    </CircuitDiagramContainer>
                </>
            ) : (
                <NoCircuitDiagramFound
                    htCable={htCable !== undefined}
                    releaseControl={pipetest === null}
                />
            )}
        </>
    );
};
