import { getCircuitDiagramCompletionStatusColor } from '@equinor/CircuitDiagram';
import { CellProps } from '@equinor/Table';
import styled from 'styled-components';
import { StatusCircle } from '../../../../packages/GardenUtils/src';
import { CheckListType } from '../../Types/pipetest';

export const CheckListStatusCell = ({
  value,
}: CellProps<CheckListType, CheckListType>): JSX.Element => {
  return (
    <StatusItem>
      <StatusText>{value.status}</StatusText>
      {value.status && (
        <StatusCircle statusColor={getCircuitDiagramCompletionStatusColor(value.status)} />
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
