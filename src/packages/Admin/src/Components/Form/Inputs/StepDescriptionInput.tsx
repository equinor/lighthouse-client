import { TextField } from '@equinor/eds-core-react';
import { WorkflowStepAdminAtomApi } from '../../../Atoms/workflowStepAdminAtomApi';

const { updateAtom, useAtomState } = WorkflowStepAdminAtomApi;
const updateTitle = (e) => {
    updateAtom({ description: e.target.value });
};

export const StepDescriptionInput = (): JSX.Element => {
    const description = useAtomState((s) => s.description);
    return (
        <TextField
            id={(Math.random() * 16).toString()}
            placeholder="Description"
            label="Write a description of the step if relevant. Will be shown to the user"
            onChange={updateTitle}
            value={description}
            meta={'(Optional)'}
            multiline
        />
    );
};
