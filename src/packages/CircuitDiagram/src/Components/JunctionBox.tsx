import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { getCircuitDiagramCompletionStatusColor } from '../../Utils/circuitDiagramHelpers';
import { CircuitDiagramNodeGroup, CircuitDiagramNodeValueText } from '../../styles/styles';
import { StatusCircle } from './StatusCircle';

interface JunctionBoxProps {
    value?: string;
    status: string;
}
export const JunctionBox = ({ value, status }: JunctionBoxProps): JSX.Element => {
    return (
        <CircuitDiagramNodeGroup>
            <JunctionBoxNode>
                <CircuitDiagramNodeValueText>
                    <div title={value}>{value?.slice(value.length - 3, value.length)}</div>
                </CircuitDiagramNodeValueText>
                <StatusCircle statusColor={getCircuitDiagramCompletionStatusColor(status)} />
            </JunctionBoxNode>
        </CircuitDiagramNodeGroup>
    );
};

const JunctionBoxNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    width: 60px;
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    min-height: 60px;
    box-sizing: border-box;
    margin-top: 16px;
    justify-content: center;
`;
