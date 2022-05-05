import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { CheckListStepTag } from '../../../Types/drcEnums';
import { EleNetwork } from '../../../Types/eleNetwork';
import { Pipetest } from '../../../Types/pipetest';
import { getElectroTestStatus } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';
import { Line } from './Line';
import { TestDot } from './TestDot';

interface HeatTracingCableProps {
    value?: string;
    pipetests: Pipetest[];
    currentPipetest: Pipetest;
    eleNetwork: EleNetwork;
}
export const HeatTracingCable = ({
    value,
    pipetests,
    currentPipetest,
    eleNetwork,
}: HeatTracingCableProps): JSX.Element => {
    const pipetestsOnHTCable = pipetests.filter((x) => x.checkLists.some((y) => y.tagNo === value));
    const checkListsForHTCable = eleNetwork.checkLists.filter((x) => x.tagNo === value);
    return (
        <ElectroViewNodeGroup>
            <HeatTracingCableNode htCount={pipetestsOnHTCable.length}>
                <ElectroViewNodeValueText>{value}</ElectroViewNodeValueText>
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
                        />
                    );
                })}
            </Lines>
        </ElectroViewNodeGroup>
    );
};

const HeatTracingCableNode = styled.div<{ htCount: number }>`
    display: flex;
    flex-direction: horizontal;
    padding: 6px;
    text-align: center;
    margin-bottom: 2px;
    margin-top: 16px;
    width: ${(p) => (p.htCount === 0 || p.htCount === 1 ? '200px' : 60 + 90 * p.htCount + 'px')};
    border-bottom: 2px dashed;

    &:after {
        content: '';
        background: ${tokens.colors.text.static_icons__default.hex};
        border-radius: 50%;
        width: 10px;
        height: 10px;

        position: relative;
        top: 18px;
        left: ${(p) => (p.htCount === 0 || p.htCount === 1 ? '60px' : 90 * p.htCount - 78 + 'px')};
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
