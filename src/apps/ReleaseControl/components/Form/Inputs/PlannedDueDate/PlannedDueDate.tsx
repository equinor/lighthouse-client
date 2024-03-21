import { TextField } from '@equinor/eds-core-react-old';
import moment from 'moment';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updatePlannedDueDate = (e) => {
  updateAtom({ plannedDueDate: e.target.value });
};

export const PlannedDueDateInput = (): JSX.Element => {
  const dueDate = useAtomState((s) => s.plannedDueDate);
  const plannedDueDate =
    dueDate !== undefined && dueDate !== '' ? moment(dueDate).format('YYYY-MM-DD') : undefined;
  return (
    <TextField
      type={'date'}
      id="Planned due date"
      meta={'(Required)'}
      label="Due date"
      onChange={updatePlannedDueDate}
      value={plannedDueDate}
    />
  );
};
