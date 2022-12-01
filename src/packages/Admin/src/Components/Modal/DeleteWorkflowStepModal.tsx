import { Button } from '@equinor/eds-core-react';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer } from './modalStyles';

export const DeleteWorkflowStepModal = (): JSX.Element => {
    const step = useAdminContext((s) => s.workflowStep);
    const { deleteWorkflowStepMutation } = useAdminMutations();
    const { deleteKey } = adminMutationKeys(step?.id);
    const { mutate } = useAdminMutation(step.id, deleteKey, deleteWorkflowStepMutation);

    async function deleteWorkflowStep() {
        mutate({ stepId: step.id });
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
                        deleteWorkflowStep();
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
                            workflowStep: step,
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
