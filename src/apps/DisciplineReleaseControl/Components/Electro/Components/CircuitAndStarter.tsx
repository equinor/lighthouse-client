import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { StatusCircle } from '../../Garden/StatusCircle';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeText, ElectroViewNodeValueText } from '../styles';
import { TestDot } from './TestDot';

interface CircuitAndStarterProps {
    value?: string;
    status: string;
    cTestStatus: string;
}
export const CircuitAndStarter = ({
    value,
    status,
    cTestStatus,
}: CircuitAndStarterProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            <ElectroViewNodeText>Circuit</ElectroViewNodeText>
            <CircuitAndStarterNode>
                <TestDot value="C" status={cTestStatus} />
                <ElectroViewNodeValueText>
                    <div title={value}>{value?.slice(value.length - 3, value.length)}</div>
                </ElectroViewNodeValueText>
                <Icon
                    size={16}
                    style={{ transform: 'rotate(90deg)' }}
                    color={'#000000'}
                    name="circuit"
                />
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
            </CircuitAndStarterNode>
        </ElectroViewNodeGroup>
    );
};

const CircuitAndStarterNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    margin-top: 4px;
    justify-content: center;
`;
