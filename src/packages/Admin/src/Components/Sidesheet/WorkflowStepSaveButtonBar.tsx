import { Button, Progress } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { WorkflowStepAdminAtomApi } from '../../Atoms/workflowStepAdminAtomApi';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ActionBar, ButtonContainer } from './sidesheet.styles';

interface WorkflowStepButtonBarProps {
    actions: SidesheetApi;
}

export const WorkflowStepSaveButtonBar = ({ actions }: WorkflowStepButtonBarProps): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const workflowStep = useAdminContext(({ workflowStep }) => workflowStep);
    const { patchKey } = adminMutationKeys(workflowStep?.id);

    const isValid = WorkflowStepAdminAtomApi.useIsValid();

    const { editWorkflowStepMutation } = useAdminMutations();

    const { isLoading, mutate } = useAdminMutation(
        workflowStep.id,
        patchKey,
        editWorkflowStepMutation
    );

    const handleSave = () => {
        const { prepareWorkflowStep } = WorkflowStepAdminAtomApi;
        mutate({
            workflowStep: prepareWorkflowStep(workflowOwner),
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
                            <Button disabled={!isValid} onClick={() => handleSave()}>
                                Save
                            </Button>
                        </>
                    )}
                </>
            </ButtonContainer>
        </ActionBar>
    );
};
