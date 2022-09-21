import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { getCircuitDiagramCompletionStatusColor } from '../../Utils/circuitDiagramHelpers';
import { CircuitDiagramNodeGroup, CircuitDiagramNodeValueText } from '../../styles/styles';
import { StatusCircle } from './StatusCircle';

interface SpaceHeaterProps {
    value?: string;
    status: string;
}
export const SpaceHeater = ({ value, status }: SpaceHeaterProps): JSX.Element => {
    return (
        <CircuitDiagramNodeGroup>
            <SpaceHeaterNode>
                <CircuitDiagramNodeValueText>
                    <div>{value}</div>
                </CircuitDiagramNodeValueText>
                <StatusCircle statusColor={getCircuitDiagramCompletionStatusColor(status)} />
            </SpaceHeaterNode>
        </CircuitDiagramNodeGroup>
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
