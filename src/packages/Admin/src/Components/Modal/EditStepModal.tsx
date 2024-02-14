import { Button, TextField } from '@equinor/eds-core-react-old';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { KeyboardEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

export const EditStepModal = (): JSX.Element => {
    const step = useAdminContext((s) => s.workflowStep);
    const [name, setName] = useState<string>(step.name);

    const { editWorkflowStepMutation } = useAdminMutations();

    const { mutate } = useMutation(editWorkflowStepMutation);

    async function editStep() {
        step.name = name;
        mutate({ workflowStep: step, saveAndClose: false });
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
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey && name !== '') {
            event.preventDefault();
            editStep();
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
                    placeholder={'Write a name for the step'}
                />
            </ModalInputContainer>

            <ModalButtonContainer>
                <Button
                    variant="contained"
                    onClick={async () => {
                        editStep();
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
                            workflow: {} as Workflow,
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
