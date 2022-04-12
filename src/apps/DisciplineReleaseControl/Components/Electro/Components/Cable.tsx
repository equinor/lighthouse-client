import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { StatusCircle } from '../../Garden/StatusCircle';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';

interface CableProps {
    value?: string;
    status: string;
}
export const Cable = ({ value, status }: CableProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            <CableNode>
                <Icon size={16} color={'#000000'} name="cable" />
                <ElectroViewNodeValueText>{value}</ElectroViewNodeValueText>
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
            </CableNode>
        </ElectroViewNodeGroup>
    );
};

const CableNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 150px;
    max-height: 15px;
    padding: 6px;
    text-align: center;
    margin-top: 16px;
    justify-content: center;
    border-bottom: 1px solid;
`;
