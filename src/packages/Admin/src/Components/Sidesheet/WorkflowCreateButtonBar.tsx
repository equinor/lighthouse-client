import { Button, Progress } from '@equinor/eds-core-react-old';
import { SidesheetApi } from '@equinor/sidesheet';
import { useMutation } from 'react-query';
import { WorkflowAdminAtomApi } from '../../Atoms/workflowAdminAtomApi';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { ActionBar, ButtonContainer } from './sidesheet.styles';

interface WorkflowButtonBarProps {
  actions: SidesheetApi;
}

export const WorkflowCreateButtonBar = ({ actions }: WorkflowButtonBarProps): JSX.Element => {
  const workflow = useAdminContext(({ workflow }) => workflow);

  const isValid = WorkflowAdminAtomApi.useIsValid();

  const { createWorkflowTemplateMutation } = useAdminMutations();
  const { isLoading, mutate } = useMutation(createWorkflowTemplateMutation);

  const handleCreate = (saveAndClose: boolean) => {
    const { prepareWorkflowTemplate } = WorkflowAdminAtomApi;
    mutate({
      model: prepareWorkflowTemplate(),
      workflowId: workflow.id,
      saveAndClose: saveAndClose,
    });
  };

  return (
    <ActionBar>
      <ButtonContainer>
        <>
          {isLoading ? (
            <Button variant="ghost_icon" disabled>
              <Progress.Dots color="primary" />
            </Button>
          ) : (
            <>
              <Button variant="outlined" onClick={() => actions.closeSidesheet()}>
                Cancel
              </Button>
              <Button disabled={!isValid} onClick={() => handleCreate(false)}>
                Save
              </Button>
              <Button disabled={!isValid} onClick={() => handleCreate(true)}>
                Save and close
              </Button>
            </>
          )}
        </>
      </ButtonContainer>
    </ActionBar>
  );
};
