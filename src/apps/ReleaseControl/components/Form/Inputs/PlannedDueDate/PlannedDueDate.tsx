import { TextField } from '@equinor/eds-core-react';
import moment from 'moment';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updatePlannedDueDate = (e) => {
    updateAtom({ plannedDueDate: e.target.value });
};

export const PlannedDueDateInput = (): JSX.Element => {
    const plannedDueDate = moment(useAtomState((s) => s.plannedDueDate)).format('YYYY-MM-DD');
    return (
        <TextField
            type={'date'}
            id="Planned due date"
            meta={'(Required)'}
            label="Planned due date"
            onChange={updatePlannedDueDate}
            value={plannedDueDate}
        />
    );
};
