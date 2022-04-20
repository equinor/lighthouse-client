import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Pipetest } from '../../../Types/pipetest';
import { StatusCircle } from '../../Garden/StatusCircle';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';
import { Line } from './Line';

interface HeatTracingCableProps {
    value?: string;
    status: string;
    pipetests: Pipetest[];
    currentPipetest: Pipetest;
}
export const HeatTracingCable = ({
    value,
    status,
    pipetests,
    currentPipetest,
}: HeatTracingCableProps): JSX.Element => {
    const pipetestsOnHTCable = pipetests.filter((x) => x.checkLists.some((y) => y.tagNo === value));

    return (
        <ElectroViewNodeGroup>
            <HeatTracingTableNode htCount={pipetestsOnHTCable.length}>
                <Icon size={16} color={'#000000'} name="heat_trace" />
                <ElectroViewNodeValueText>{value}</ElectroViewNodeValueText>
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
            </HeatTracingTableNode>
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

const HeatTracingTableNode = styled.div<{ htCount: number }>`
    display: flex;
    flex-direction: horizontal;
    padding: 6px;
    text-align: center;
    margin-bottom: 2px;
    margin-top: 16px;
    width: ${(p) => (p.htCount === 0 || p.htCount === 1 ? '130px' : 50 + 88 * p.htCount + 'px')};

    border-bottom: 2px dashed;
`;

const Lines = styled.div`
    display: flex;
    flex: 0 0 100%;
`;
