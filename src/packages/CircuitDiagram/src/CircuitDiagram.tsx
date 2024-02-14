import { useQuery } from 'react-query';
import { CircuitNode } from './Components/CircuitNode';
import {
    getCircuitDiagramCompletionStatusColor,
    getNodeStatus,
    updateDisconnection,
    updateIsolation,
} from '../Utils/circuitDiagramHelpers';
import {
    CircuitDiagramContainer,
    CircuitDiagramEditMode,
    CircuitDiagramFillerDiv,
    CircuitDiagramNodeGroupRow,
    CircuitDiagramNodeText,
    CircuitDiagramPopover,
    CircuitDiagramRow,
    CircuitDiagramWrapper,
    SwitchBoardBorderContainer,
    SwitchBoardContainer,
} from '../styles/styles';
import { EleNetwork, EleNetworkCable } from './types/eleNetwork';
import { getEleNetworks } from './Api/getEleNetworks';
import { Pipetest } from './types/pipetestTypes';
import { NoCircuitDiagramFound } from './Components/NoCircuitDiagramFound';
import { StatusCircle } from './Components/StatusCircle';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@equinor/eds-core-react-old';

export type CircuitDiagramTag = {
    tagNo: string;
};

interface CircuitDiagramProps {
    /* Current pipetest */
    pipetest: Pipetest | null;
    /* All pipetests (used to find another pipetest to change sidesheet) */
    pipetests: Pipetest[];
    width: number;
    /* HT cable tagNo if htCable should be the focus of the diagram (HT sidesheet) */
    htCable?: string;
    /* list of circuitAndStarterTagNos to fetch eleNetworks from and display */
    circuitAndStarterTagNos: string[];
    /* For opening a different sidesheet, for example by clicking on a HT-cable (opens HT sidesheet) */
    onGroupeSelect?: (item: Record<PropertyKey, unknown>) => void;
    /* For opening same sidesheet but with a different pipetest */
    onSelect?: (item: Record<PropertyKey, unknown>) => void;

    onClickEntity?: (clickEvent: CircuitDiagramTag) => void;

    sidesheetType: 'rc' | 'ht' | 'pt';
}

export const CircuitDiagram = ({
    pipetest,
    pipetests,
    width,
    htCable,
    circuitAndStarterTagNos,
    onGroupeSelect,
    onSelect,
    onClickEntity,
    sidesheetType,
}: CircuitDiagramProps): JSX.Element => {
    const [switchboards, setSwitchboards] = useState<EleNetwork[][]>([]);
    //Global component state for edit mode and (reusable) comment
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');

    const circuitStarterTagNoString = circuitAndStarterTagNos?.toString();
    const buttonText = isEditMode
        ? 'Exit edit mode'
        : 'Edit which circuits/lines that are isolated and equipment that is disconnected';

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    let { data } = useQuery(
        [circuitStarterTagNoString],
        () => getEleNetworks(circuitStarterTagNoString ?? ''),
        {
            staleTime: Infinity,
            //no cache time since we need to fetch new updates every time because of possible isolations/disconnections
            cacheTime: 0,
        }
    );

    //Alphabetical sorting
    useMemo(
        () =>
            data?.map((x) => {
                x.circuits.sort((a, b) => a.tagNo?.localeCompare(b?.tagNo));
                x.cables.sort((a, b) => a.tagNo?.localeCompare(b?.tagNo));
                return x;
            }),
        [data]
    );

    let switchboardArray;

    //If ht cable sidesheet => filter out data that is not connected to said ht cable
    data = useMemo(
        () => (htCable ? data?.filter((x) => x.circuits.some((x) => x.tagNo === htCable)) : data),
        [data, htCable]
    );

    //Group by switchboard. One array of eleNetworks to one switchboard.
    switchboardArray = useMemo(
        () =>
            data
                ? Object.values(
                      data?.reduce((acc, item) => {
                          const circuitAndStarterTagNo = item.circuitAndStarterTagNo.split('-'); //split to find common switchboard tagNo
                          acc[circuitAndStarterTagNo[0]] = [
                              ...(acc[circuitAndStarterTagNo[0]] || []),
                              item,
                          ];
                          return acc;
                      }, {})
                  )
                : [],
        [data]
    );

    // Sort circuits
    useMemo(
        () =>
            switchboardArray?.forEach((x) =>
                x.sort((a, b) =>
                    a?.circuitAndStarterTagNo
                        .split('-')[1]
                        ?.localeCompare(b?.circuitAndStarterTagNo.split('-')[1])
                )
            ),
        [switchboardArray]
    );

    //Sort switchboards
    useMemo(
        () =>
            switchboardArray?.sort((a, b) =>
                a[0]?.circuitAndStarterTagNo
                    ?.split('-')[0]
                    ?.localeCompare(b[0]?.circuitAndStarterTagNo?.split('-')[0])
            ),
        [switchboardArray]
    );

    //Update switchboards/diagram if there is new circuitTagNos/data
    useEffect(() => {
        if (switchboardArray) {
            setSwitchboards(switchboardArray);
        } else {
            setSwitchboards([]);
        }
    }, [circuitAndStarterTagNos, data]);

    if (circuitStarterTagNoString === '' || circuitStarterTagNoString === undefined) {
        return (
            <NoCircuitDiagramFound
                htCable={htCable !== undefined}
                releaseControl={pipetest === null}
            />
        );
    }

    const updateDiagram = (
        updatedCable: EleNetworkCable | undefined,
        updatedCircuit: EleNetwork | undefined,
        circuitTagNo: string
    ): void => {
        if (updatedCable) {
            switchboardArray = updateDisconnection(switchboardArray, updatedCable, circuitTagNo);
        }
        if (updatedCircuit) {
            switchboardArray = updateIsolation(switchboardArray, updatedCircuit, circuitTagNo);
        }
        setSwitchboards([...switchboardArray]);
    };

    return (
        <>
            {circuitStarterTagNoString !== '' ? (
                <>
                    {!data && <h3 style={{ marginLeft: '8px' }}>Loading circuit diagram...</h3>}
                    <CircuitDiagramWrapper width={width}>
                        <CircuitDiagramContainer width={width}>
                            {/* Switchboard array that gets rendered here is an array of switchboards.
                             Each switchboard contains an array of eleNetworks where each array which renders one circuit on the switchboard*/}

                            {switchboards?.map((eleNetworksForSwitchboard: EleNetwork[]) => {
                                const switchboardTagNo =
                                    eleNetworksForSwitchboard[0].circuitAndStarterTagNo.split('-');
                                const switchboardStatus = getNodeStatus(
                                    eleNetworksForSwitchboard[0].checkLists,
                                    switchboardTagNo[0]
                                );
                                return (
                                    <SwitchBoardContainer
                                        key={eleNetworksForSwitchboard[0].circuitAndStarterTagNo}
                                    >
                                        <SwitchBoardBorderContainer>
                                            <CircuitDiagramNodeGroupRow>
                                                <CircuitDiagramNodeText
                                                    onClick={() =>
                                                        onClickEntity &&
                                                        onClickEntity({
                                                            tagNo: switchboardTagNo[0],
                                                        })
                                                    }
                                                    clickable={sidesheetType === 'rc'}
                                                >
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
                                                        (x) => x.parentEleNetId === ''
                                                    );
                                                    return (
                                                        <CircuitDiagramRow
                                                            key={eleNetwork.eleNetId}
                                                        >
                                                            <CircuitNode
                                                                onClickEntity={onClickEntity}
                                                                key={startNode?.eleNetId}
                                                                node={startNode}
                                                                eleNetwork={eleNetwork}
                                                                pipetests={pipetests}
                                                                currentPipetest={pipetest}
                                                                htCable={htCable}
                                                                onGroupeSelect={onGroupeSelect}
                                                                onSelect={onSelect}
                                                                isEditMode={isEditMode}
                                                                disconnected={
                                                                    eleNetwork?.isolated === true
                                                                }
                                                                comment={comment}
                                                                setComment={setComment}
                                                                updateDiagram={updateDiagram}
                                                                sidesheetType={sidesheetType}
                                                            />
                                                        </CircuitDiagramRow>
                                                    );
                                                }
                                            )}
                                        </SwitchBoardBorderContainer>
                                    </SwitchBoardContainer>
                                );
                            })}
                            <CircuitDiagramEditMode onMouseOver={onOpen} onMouseLeave={onClose}>
                                {!isEditMode && (
                                    <Button onClick={() => setIsEditMode(true)}>
                                        Edit isolations
                                    </Button>
                                )}
                                {isEditMode && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setIsEditMode(false);
                                            setComment('');
                                        }}
                                    >
                                        Exit edit mode
                                    </Button>
                                )}
                                {isOpen && (
                                    <CircuitDiagramPopover cornerButton={true}>
                                        {buttonText}
                                    </CircuitDiagramPopover>
                                )}
                            </CircuitDiagramEditMode>
                        </CircuitDiagramContainer>

                        <CircuitDiagramFillerDiv />
                    </CircuitDiagramWrapper>
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
