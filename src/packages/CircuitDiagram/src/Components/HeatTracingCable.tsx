import { tokens } from '@equinor/eds-tokens';
import { useWorkSpace } from '@equinor/WorkSpace';
import styled from 'styled-components';
import {
    getCircuitTestStatus,
    getHTSidesheetObjectForHtCable,
} from '../../Utils/circuitDiagramHelpers';
import { CircuitDiagramHTText, CircuitDiagramNodeGroup } from '../../styles/styles';
import { EleNetwork } from '../types/eleNetwork';
import { CheckListStepTag, Pipetest } from '../types/pipetestTypes';
import { Line } from './Line';
import { TestDot } from './TestDot';

interface HeatTracingCableProps {
    value?: string;
    pipetests: Pipetest[];
    currentPipetest: Pipetest | null;
    eleNetwork: EleNetwork;
    htCable?: string;
}
export const HeatTracingCable = ({
    value,
    pipetests,
    currentPipetest,
    eleNetwork,
    htCable,
}: HeatTracingCableProps): JSX.Element => {
    const { onGroupeSelect } = useWorkSpace();
    const pipetestsOnHTCable = pipetests.filter((x) => x.checkLists.some((y) => y.tagNo === value));
    const checkListsForHTCable = eleNetwork.checkLists.filter((x) => x.tagNo === value);
    return (
        <CircuitDiagramNodeGroup>
            <HeatTracingCableNode pipetestCount={pipetestsOnHTCable.length}>
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
                        />
                    );
                })}
            </Lines>
        </CircuitDiagramNodeGroup>
    );
};

const HeatTracingCableNode = styled.div<{ pipetestCount: number }>`
    display: flex;
    flex-direction: horizontal;
    padding: 3px;
    padding-top: 6px;
    text-align: center;
    margin-bottom: 2px;
    margin-top: 12px;
    width: ${(p) =>
        p.pipetestCount === 0 || p.pipetestCount === 1
            ? '150px'
            : 45 + 92 * p.pipetestCount + 'px'};
    border-bottom: 2px dashed ${tokens.colors.text.static_icons__default.hex};

    &:after {
        content: '';
        background: ${tokens.colors.text.static_icons__default.hex};
        border-radius: 50%;
        width: 10px;
        height: 10px;

        position: relative;
        top: 18px;
        left: ${(p) =>
            p.pipetestCount === 0 || p.pipetestCount === 1
                ? '30px'
                : 92 * p.pipetestCount - 76 + 'px'};
    }
`;

const Lines = styled.div`
    display: flex;
    flex: 0 0 100%;
`;

const ABTestDots = styled.div`
    display: flex;
    flex-direction: horizontal;
    width: 50px;
    margin-left: 8px;
`;
