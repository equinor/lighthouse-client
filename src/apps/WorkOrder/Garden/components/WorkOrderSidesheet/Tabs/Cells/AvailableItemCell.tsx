import { CellProps } from '@equinor/Table';
import { WorkOrderMaterial } from '../../../../models';
import { Tooltip, Icon } from '@equinor/eds-core-react-old';

export const AvailableItemCell = (props: CellProps<WorkOrderMaterial, WorkOrderMaterial>) => {
  const { value } = props;
  if (value === null) {
    return null;
  }
  const refTitle = value.available === 'Y' ? 'Available' : 'Not Available';

  return (
    <Tooltip title={refTitle}>
      {value.available === 'Y' ? (
        <Icon color="green" name="check" />
      ) : (
        <Icon color="red" name="clear" />
      )}
    </Tooltip>
  );
};
