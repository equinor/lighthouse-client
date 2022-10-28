import { getCircuitDiagramCompletionStatusColor } from '../../Utils/circuitDiagramHelpers';
import {
    CircuitDiagramNodeGroup,
    CircuitDiagramNodeValueText,
    SpaceHeaterNode,
} from '../../styles/styles';
import { StatusCircle } from './StatusCircle';
import { memo } from 'react';

interface SpaceHeaterProps {
    value?: string;
    status: string;
}
const SpaceHeater = ({ value, status }: SpaceHeaterProps): JSX.Element => {
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

export default memo(SpaceHeater);
