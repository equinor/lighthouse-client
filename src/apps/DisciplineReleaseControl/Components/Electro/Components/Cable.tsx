import styled from 'styled-components';
import { StatusCircle } from '../../../../../packages/GardenUtils/src';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';

interface CableProps {
    value?: string;
    status: string;
    borderBottom?: boolean;
}
export const Cable = ({ value, status, borderBottom }: CableProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            <CableNode borderBottom={borderBottom}>
                <ElectroViewNodeValueText>{value}</ElectroViewNodeValueText>
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
            </CableNode>
        </ElectroViewNodeGroup>
    );
};

const CableNode = styled.div<{ borderBottom?: boolean }>`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 110px;
    max-height: 15px;
    padding: 6px;
    text-align: center;
    margin-top: ${(p) => (p.borderBottom ? '16px' : null)};
    justify-content: center;
    border-bottom: ${(p) => (p.borderBottom ? '1px solid' : null)};
`;
