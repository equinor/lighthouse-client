import {
    getCircuitTestStatus,
    getHTSidesheetObjectForHtCable,
} from '../../Utils/circuitDiagramHelpers';
import { CircuitDiagramHTText, CircuitDiagramNodeGroup } from '../../styles/styles';
import { EleNetwork } from '../types/eleNetwork';
import { CheckListStepTag, Pipetest } from '../types/pipetestTypes';
import Line from './Line';
import { TestDot } from './TestDot';
import { ABTestDots, HeatTracingCableNode, Lines } from '../../styles/htCableStyles';
import { memo } from 'react';

interface HeatTracingCableProps {
    value?: string;
    pipetests: Pipetest[];
    currentPipetest: Pipetest | null;
    eleNetwork: EleNetwork;
    htCable?: string;
    onGroupeSelect?: (item: Record<PropertyKey, unknown>) => void;
    onSelect?: (item: Record<PropertyKey, unknown>) => void;
    disconnected: boolean;
}
const HeatTracingCable = ({
    value,
    pipetests,
    currentPipetest,
    eleNetwork,
    htCable,
    onGroupeSelect,
    onSelect,
    disconnected,
}: HeatTracingCableProps): JSX.Element => {
    const pipetestsOnHTCable = pipetests.filter((x) => x.checkLists.some((y) => y.tagNo === value));
    const checkListsForHTCable = eleNetwork.checkLists.filter((x) => x.tagNo === value);
    return (
        <CircuitDiagramNodeGroup>
            <HeatTracingCableNode
                pipetestCount={pipetestsOnHTCable.length}
                disconnected={disconnected}
            >
                {htCable === value ? (
                    <CircuitDiagramHTText
                        onClick={() => {
                            currentPipetest &&
                                value &&
                                onGroupeSelect &&
                                onGroupeSelect(getHTSidesheetObjectForHtCable(value, pipetests));
                        }}
                        clickable={false}
                        highlight={true}
                    >
                        {value}
                    </CircuitDiagramHTText>
                ) : (
                    <CircuitDiagramHTText
                        onClick={() => {
                            currentPipetest &&
                                value &&
                                onGroupeSelect &&
                                onGroupeSelect(getHTSidesheetObjectForHtCable(value, pipetests));
                        }}
                        clickable={currentPipetest !== null}
                    >
                        {value}
                    </CircuitDiagramHTText>
                )}
                <ABTestDots>
                    <TestDot
                        value="A"
                        status={getCircuitTestStatus(CheckListStepTag.HtTest, checkListsForHTCable)}
                    />
                    <TestDot
                        value="B"
                        status={getCircuitTestStatus(
                            CheckListStepTag.HtRetest,
                            checkListsForHTCable
                        )}
                    />
                </ABTestDots>
            </HeatTracingCableNode>
            <Lines>
                {pipetestsOnHTCable.map((x) => {
                    return (
                        <Line
                            key={x.name}
                            value={x.name}
                            currentPipetest={
                                currentPipetest === null ? false : x.name === currentPipetest.name
                            }
                            pipetest={pipetests.find((pipetest) => pipetest.name === x.name)}
                            htCable={htCable}
                            onSelect={onSelect}
                        />
                    );
                })}
            </Lines>
        </CircuitDiagramNodeGroup>
    );
};

export default memo(HeatTracingCable);
