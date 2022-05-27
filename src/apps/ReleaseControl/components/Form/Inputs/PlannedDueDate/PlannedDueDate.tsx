import { TextField } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updatePlannedDueDate = (e) => {
    updateAtom({ plannedDueDate: e.target.value });
};

export const PlannedDueDateInput = (): JSX.Element => {
    const plannedDueDate = useAtomState((s) => s.plannedDueDate);

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
