import { getCircuitDiagramCompletionStatusColor } from '../../Utils/circuitDiagramHelpers';
import {
  CircuitDiagramNodeGroup,
  CircuitDiagramNodeValueText,
  CircuitDiagramPopover,
  JunctionBoxNode,
} from '../../styles/styles';
import { StatusCircle } from './StatusCircle';
import { memo, useState } from 'react';

interface JunctionBoxProps {
  value?: string;
  status: string;
  disconnected: boolean;
}
const JunctionBox = ({ value, status, disconnected }: JunctionBoxProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <CircuitDiagramNodeGroup>
      <JunctionBoxNode disconnected={disconnected}>
        <CircuitDiagramNodeValueText>
          <div title={value}>{value?.slice(value.length - 3, value.length)}</div>
        </CircuitDiagramNodeValueText>
        <div onMouseOver={onOpen} onMouseLeave={onClose}>
          <StatusCircle statusColor={getCircuitDiagramCompletionStatusColor(status)} />
          {isOpen && <CircuitDiagramPopover>{status}</CircuitDiagramPopover>}
        </div>
      </JunctionBoxNode>
    </CircuitDiagramNodeGroup>
  );
};

export default memo(JunctionBox);
