import { Button, Progress } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { useMutation } from 'react-query';
import { WorkflowStepAdminAtomApi } from '../../Atoms/workflowStepAdminAtomApi';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { ActionBar, ButtonContainer } from './sidesheet.styles';

interface WorkflowStepButtonBarProps {
    actions: SidesheetApi;
}

export const WorkflowStepCreateButtonBar = ({
    actions,
}: WorkflowStepButtonBarProps): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const isValid = WorkflowStepAdminAtomApi.useIsValid();

    const { createWorkflowStepMutation } = useAdminMutations();
    const { isLoading, mutate } = useMutation(createWorkflowStepMutation);

    const handleCreate = (saveAndClose: boolean) => {
        const { prepareWorkflowStep } = WorkflowStepAdminAtomApi;
        mutate({
            workflowStep: prepareWorkflowStep(workflowOwner),
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
