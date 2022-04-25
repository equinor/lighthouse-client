import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { StatusCircle } from '../../../../../packages/GardenUtils/src';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';

interface JunctionBoxProps {
    value?: string;
    status: string;
}
export const JunctionBox = ({ value, status }: JunctionBoxProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            <JunctionBoxNode>
                <ElectroViewNodeValueText>
                    <div title={value}>{value?.slice(value.length - 3, value.length)}</div>
                </ElectroViewNodeValueText>
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
            </JunctionBoxNode>
        </ElectroViewNodeGroup>
    );
};

const JunctionBoxNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 90px;
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    min-height: 60px;
    box-sizing: border-box;
    margin-top: 16px;
    justify-content: center;
`;
