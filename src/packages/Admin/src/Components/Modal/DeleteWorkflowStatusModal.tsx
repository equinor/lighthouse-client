import { Button } from '@equinor/eds-core-react';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer } from './modalStyles';

export const DeleteWorkflowStatusModal = (): JSX.Element => {
    const status = useAdminContext((s) => s.status);
    const { deleteWorkflowStatusMutation } = useAdminMutations();
    const { deleteKey } = adminMutationKeys(status?.id);
    const { mutate } = useAdminMutation(status.id, deleteKey, deleteWorkflowStatusMutation);

    async function deleteWorkflowStatus() {
        mutate({ id: status.id });
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
                        deleteWorkflowStatus();
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
                            workflow: {} as Workflow,
                            workflowStep: {} as WorkflowStepTemplate,
                            status: status,
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
