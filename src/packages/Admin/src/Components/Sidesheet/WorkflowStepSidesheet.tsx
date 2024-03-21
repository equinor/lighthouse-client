import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';

import { SidesheetApi } from '@equinor/sidesheet';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { FlexColumn, Wrapper } from './sidesheet.styles';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useEffect } from 'react';
import { updateContext } from '../../Atoms/updateContext';
import { useWorkflowStepSidesheetEffects } from '../../Hooks/useWorkflowStepSidesheetEffects';
import { WorkflowStepAdminAtomApi } from '../../Atoms/workflowStepAdminAtomApi';
import { useGetWorkflowStep } from '../../Hooks/useGetWorkflowStep';
import { useAdminMutationWatcher } from '../../Hooks/useAdminMutationWatcher';
import { WorkflowStepActions } from './WorkflowStepActions';
import { Autocomplete, FormContainer, TextField } from '../../../../EdsForm';
import {
  useCreateWorkflowStep,
  useUpdateWorkflowStep,
} from '../../Hooks/useWorkflowStepFormActions';
import { useWorkflowStepStatuses } from '../../Hooks/useWorkflowStepStatuses';
import { Typography } from '@equinor/eds-core-react';

interface WorkflowSidesheetProps {
  readonly item: WorkflowStepTemplate;
  readonly actions: SidesheetApi;
}

export function WorkflowStepSidesheet({ item, actions }: WorkflowSidesheetProps): JSX.Element {
  const app = useAdminContext((s) => s.app);
  const workflowOwner = useAdminContext((s) => s.workflowOwner);

  useGetWorkflowStep(app, workflowOwner, item.id, item);
  useWorkflowStepSidesheetEffects(actions, item);
  useAdminMutationWatcher(item.id);

  const {
    saveWorkflowStep,
    isLoading: isLoadingSave,
    isError: isErrorUpdate,
  } = useUpdateWorkflowStep();
  const {
    createWorkflowStep,
    isLoading: isLoadingCreate,
    isError: isErrorCreate,
  } = useCreateWorkflowStep();

  const { clearState, updateAtom } = WorkflowStepAdminAtomApi;

  useEffect(() => {
    clearState();
    updateContext({
      app: app,
      workflowOwner: workflowOwner,
      workflow: {} as Workflow,
      workflowStep: item,
      status: {} as WorkflowStatus,
      isEditingWorkflow: false,
      isEditingStep: false,
      deletingWorkflow: false,
      deletingStep: false,
      deletingStatus: false,
    });
    updateAtom({
      id: item.id,
      name: item.name,
      description: item.description,
      completedStatusName: item.completedStatusName,
    });
  }, [item?.id, item?.name]);

  const onSubmit = async (values: FormikValues) => {
    updateAtom({ ...values });

    if (!item.id) {
      createWorkflowStep();
      return;
    }

    saveWorkflowStep();
  };

  const onClose = async () => {
    actions.closeSidesheet();
  };

  const workflowStatuses = useWorkflowStepStatuses();

  const isLoading = isLoadingSave || isLoadingCreate;

  const validationSchema = object().shape({
    description: string()
      .max(4000, 'The name must be less than 4000 characters!')
      .required('(Required)'),
    completedStatusName: string()
      .oneOf(workflowStatuses, 'Select one of the options in the dropdown')
      .required('(Required)'),
  });
  return (
    <Wrapper>
      <FormContainer
        initialValues={item}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={onSubmit}
      >
        <Form>
          <FlexColumn>
            <span>General info</span>
            <TextField
              id="description"
              name="description"
              placeholder="Description"
              label="Write a description of the step if relevant. Will be shown to the user"
              multiline
            />

            <span>When signed, change workflow status to:</span>
            <Autocomplete
              name="completedStatusName"
              options={workflowStatuses}
              label="Workflow status when step is signed"
              placeholder="Select workflow status"
            />
          </FlexColumn>
          {(isErrorCreate || isErrorUpdate) && (
            <Typography variant="h3">
              Unable to create/update Workflow step. Please try again later.
            </Typography>
          )}
          <WorkflowStepActions isLoading={isLoading} onClose={onClose} />
        </Form>
      </FormContainer>
    </Wrapper>
  );
}
