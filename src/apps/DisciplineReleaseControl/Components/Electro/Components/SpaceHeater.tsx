import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { StatusCircle } from '../../../../../packages/GardenUtils/src';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';

interface SpaceHeaterProps {
    value?: string;
    status: string;
}
export const SpaceHeater = ({ value, status }: SpaceHeaterProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            <SpaceHeaterNode>
                <ElectroViewNodeValueText>
                    <div>{value}</div>
                </ElectroViewNodeValueText>
                <StatusCircle statusColor={getElectroViewCompletionStatusColor(status)} />
            </SpaceHeaterNode>
        </ElectroViewNodeGroup>
    );
};

const SpaceHeaterNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 150px;
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    min-height: 60px;
    box-sizing: border-box;
    margin-top: 16px;
    justify-content: center;
`;
