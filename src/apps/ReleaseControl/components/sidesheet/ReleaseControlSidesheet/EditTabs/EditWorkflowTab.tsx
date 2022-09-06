import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import {
    FlexColumn,
    FormWrapper,
    NewStepButton,
} from '../../../Form/releaseControlProcessForm.styles';

import { EditButtonBar } from './EditButtonBar';
import { WorkflowCustomEditor } from '../../../Form/WorkflowEditor/WorkflowCustomEditor';
import { addStep } from '../../../Form/WorkflowEditor/WorkflowEditorHelpers';

export const EditWorkflowTab = (): JSX.Element => {
    const { useAtomState } = DRCFormAtomApi;
    const steps = useAtomState(({ workflowSteps }) => workflowSteps ?? []);

    return (
        <>
            <FormWrapper>
                <FlexColumn>
                    Workflow
                    <WorkflowCustomEditor />
                    {steps.length !== 0 && (
                        <NewStepButton onClick={() => addStep(steps)}>Add step</NewStepButton>
                    )}
                </FlexColumn>
            </FormWrapper>
            <EditButtonBar />
        </>
    );
};
