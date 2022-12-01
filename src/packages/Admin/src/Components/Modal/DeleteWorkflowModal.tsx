import { Button } from '@equinor/eds-core-react';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer } from './modalStyles';

export const DeleteWorkflowModal = (): JSX.Element => {
    const workflow = useAdminContext((s) => s.workflow);
    const { deleteWorkflowMutation } = useAdminMutations();
    const { deleteKey } = adminMutationKeys(workflow?.id);
    const { mutate } = useAdminMutation(workflow.id, deleteKey, deleteWorkflowMutation);

    async function deleteWorkflow() {
        mutate({ workflowId: workflow.id });
        updateContext({
            app: '',
            workflowOwner: '',
            workflow: {} as Workflow,
            workflowStep: {} as WorkflowStepTemplate,
            status: {} as WorkflowStatus,
            isEditingWorkflow: false,
            isEditingStep: false,
            deletingWorkflow: false,
            deletingStep: false,
            deletingStatus: false,
        });
    }

    return (
        <>
            <ModalButtonContainer>
                <Button
                    onClick={() => {
                        deleteWorkflow();
                    }}
                    color="danger"
                    variant="outlined"
                >
                    Delete
                </Button>
                <Button
                    onClick={() =>
                        updateContext({
                            app: '',
                            workflowOwner: '',
                            workflow: workflow,
                            workflowStep: {} as WorkflowStepTemplate,
                            status: {} as WorkflowStatus,
                            isEditingWorkflow: false,
                            isEditingStep: false,
                            deletingWorkflow: false,
                            deletingStep: false,
                            deletingStatus: false,
                        })
                    }
                    variant="outlined"
                >
                    Close
                </Button>
            </ModalButtonContainer>
        </>
    );
};
