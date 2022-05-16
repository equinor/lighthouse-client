import { TextField } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updatePlannedStartDate = (e) => {
    updateAtom({ plannedStartDate: e.target.value });
};

export const PlannedStartDateInput = (): JSX.Element => {
    const plannedStartDate = useAtomState((s) => s.plannedStartDate);

    return (
        <TextField
            type={'date'}
            id="Planned start date"
            meta={'(Required)'}
            label="Planned start date"
            onChange={updatePlannedStartDate}
            value={plannedStartDate}
        />
    );
};
