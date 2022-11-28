import { Button, Progress } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { WorkflowAdminAtomApi } from '../../Atoms/workflowAdminAtomApi';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ActionBar, ButtonContainer } from './sidesheet.styles';

interface WorkflowButtonBarProps {
    actions: SidesheetApi;
}

export const WorkflowSaveButtonBar = ({ actions }: WorkflowButtonBarProps): JSX.Element => {
    const workflow = useAdminContext(({ workflow }) => workflow);
    const { patchKey } = adminMutationKeys(workflow?.id);

    const isValid = WorkflowAdminAtomApi.useIsValid();

    const { editWorkflowTemplateMutation } = useAdminMutations();

    const { isLoading, mutate } = useAdminMutation(
        workflow.id,
        patchKey,
        editWorkflowTemplateMutation
    );

    const handleSave = () => {
        const { prepareWorkflowTemplate } = WorkflowAdminAtomApi;
        mutate({
            model: prepareWorkflowTemplate(),
            workflowId: workflow.id,
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
