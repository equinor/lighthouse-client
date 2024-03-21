import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import {
  FlexColumn,
  FormWrapper,
  NewStepButton,
} from '../../../Form/releaseControlProcessForm.styles';

import { EditButtonBar } from './EditButtonBar';
import { WorkflowCustomEditor } from '../../../Form/WorkflowEditor/WorkflowCustomEditor';
import { addStep } from '../../../Form/WorkflowEditor/WorkflowEditorHelpers';
import { Wrapper, WrapperFillerDiv } from '../sidesheetStyles';

export const EditWorkflowTab = (): JSX.Element => {
  const { useAtomState } = DRCFormAtomApi;
  const steps = useAtomState(({ workflowSteps }) => workflowSteps ?? []);

  return (
    <Wrapper>
      <FormWrapper>
        <FlexColumn>
          Workflow
          <WorkflowCustomEditor isEditMode={false} />
          {steps.length !== 0 && (
            <NewStepButton onClick={() => addStep(steps)}>Add step</NewStepButton>
          )}
        </FlexColumn>
      </FormWrapper>
      <WrapperFillerDiv />

      <EditButtonBar />
    </Wrapper>
  );
};
