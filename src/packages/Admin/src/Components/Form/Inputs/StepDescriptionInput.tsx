import { TextField } from '@equinor/eds-core-react-old';
import { WorkflowStepAdminAtomApi } from '../../../Atoms/workflowStepAdminAtomApi';

const { updateAtom } = WorkflowStepAdminAtomApi;
const updateTitle = (e) => {
    updateAtom({ description: e.target.value });
};
interface StepDescriptionInputProps {
    description: string;
}

export const StepDescriptionInput = ({ description }: StepDescriptionInputProps): JSX.Element => {
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
