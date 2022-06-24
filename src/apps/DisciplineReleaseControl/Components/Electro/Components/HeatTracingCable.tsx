import { tokens } from '@equinor/eds-tokens';
import { useWorkSpace } from '@equinor/WorkSpace';
import styled from 'styled-components';
import { CheckListStepTag } from '../../../Types/drcEnums';
import { EleNetwork } from '../../../Types/eleNetwork';
import { Pipetest } from '../../../Types/pipetest';
import { getElectroTestStatus, getHTSidesheetObjectForHtCable } from '../electroViewHelpers';
import { ElectroViewHTHighlight, ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';
import { Line } from './Line';
import { TestDot } from './TestDot';

interface HeatTracingCableProps {
    value?: string;
    pipetests: Pipetest[];
    currentPipetest: Pipetest;
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
        <ElectroViewNodeGroup>
            <HeatTracingCableNode pipetestCount={pipetestsOnHTCable.length}>
                {htCable === value ? (
                    <ElectroViewHTHighlight
                        onClick={() => {
                            value &&
                                onGroupeSelect &&
                                onGroupeSelect(getHTSidesheetObjectForHtCable(value, pipetests));
                        }}
                    >
                        {value}
                    </ElectroViewHTHighlight>
                ) : (
                    <ElectroViewNodeValueText
                        onClick={() => {
                            value &&
                                onGroupeSelect &&
                                onGroupeSelect(getHTSidesheetObjectForHtCable(value, pipetests));
                        }}
                        clickable={true}
                    >
                        {value}
                    </ElectroViewNodeValueText>
                )}
                <ABTestDots>
                    <TestDot
                        value="A"
                        status={getElectroTestStatus(CheckListStepTag.HtTest, checkListsForHTCable)}
                    />
                    <TestDot
                        value="B"
                        status={getElectroTestStatus(
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
                            currentPipetest={x.name === currentPipetest.name}
                            pipetest={pipetests.find((pipetest) => pipetest.name === x.name)}
                            htCable={htCable}
                        />
                    );
                })}
            </Lines>
        </ElectroViewNodeGroup>
    );
};

const HeatTracingCableNode = styled.div<{ pipetestCount: number }>`
    display: flex;
    flex-direction: horizontal;
    padding: 3px;
    padding-top: 6px;
    text-align: center;
    margin-bottom: 2px;
    margin-top: 16px;
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
