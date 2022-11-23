import { Button, Progress } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { useMutation } from 'react-query';
import { WorkflowStepAdminAtomApi } from '../../Atoms/workflowStepAdminAtomApi';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { ActionBar, ButtonContainer } from './sidesheet.styles';

interface WorkflowStepButtonBarProps {
    actions: SidesheetApi;
}

export const WorkflowStepCreateButtonBar = ({
    actions,
}: WorkflowStepButtonBarProps): JSX.Element => {
    const isValid = WorkflowStepAdminAtomApi.useIsValid();

    const { createWorkflowStepMutation } = useAdminMutations();
    const { isLoading, mutate } = useMutation(createWorkflowStepMutation);

    const handleCreate = () => {
        const { prepareWorkflowStep } = WorkflowStepAdminAtomApi;
        mutate({
            workflowStep: prepareWorkflowStep(),
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
                            <Button disabled={!isValid} onClick={() => handleCreate()}>
                                Save
                            </Button>
                        </>
                    )}
                </>
            </ButtonContainer>
        </ActionBar>
    );
};
