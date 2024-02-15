import { Button, TextField } from '@equinor/eds-core-react-old';
import { WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { KeyboardEventHandler, useState } from 'react';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

export const EditWorkflowModal = (): JSX.Element => {
    const workflow = useAdminContext((s) => s.workflow);
    const [name, setName] = useState<string>(workflow.name);
    const { patchKey } = adminMutationKeys(workflow.id);

    const { editWorkflowMutation } = useAdminMutations();

    const { mutate } = useAdminMutation(workflow.id, patchKey, editWorkflowMutation);

    async function editWorkflow() {
        mutate({ workflowId: workflow.id, name: name });
        workflow.name = name;
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
        });
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
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
            });
        }
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey && name !== '') {
            event.preventDefault();
            editWorkflow();
        }
    };

    return (
        <div onKeyDown={handleOnKeyPress} tabIndex={0}>
            <ModalInputContainer>
                <TextField
                    variant="default"
                    id="name"
                    label="Name"
                    value={name}
                    onChange={onNameChange}
                    multiline
                    autoFocus={true}
                    placeholder={'Write a name for the workflow'}
                />
            </ModalInputContainer>

            <ModalButtonContainer>
                <Button
                    variant="contained"
                    onClick={async () => {
                        editWorkflow();
                    }}
                    disabled={name === ''}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
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
                        });
                    }}
                >
                    Cancel
                </Button>
            </ModalButtonContainer>
        </div>
    );
};
