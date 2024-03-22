import { getCircuitDiagramCompletionStatusColor } from '@equinor/CircuitDiagram';
import { CellProps } from '@equinor/Table';
import styled from 'styled-components';
import { StatusCircle } from '../../../../packages/GardenUtils/src';
import { InsulationBoxType } from '../../Types/pipetest';

export const InsulationStatusTableCell = ({
  value,
}: CellProps<InsulationBoxType, InsulationBoxType>): JSX.Element => {
  return (
    <StatusItem>
      <StatusText>{value.procosysStatus}</StatusText>
      {value.procosysStatus && (
        <StatusCircle statusColor={getCircuitDiagramCompletionStatusColor(value.procosysStatus)} />
      )}
    </StatusItem>
  );
};

export const StatusItem = styled.div`
  display: flex;
  flex-direction: horizontal;
`;

export const StatusText = styled.div`
  width: 20px;
`;
