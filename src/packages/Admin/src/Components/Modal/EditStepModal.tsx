import { Button, TextField } from '@equinor/eds-core-react';
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
        mutate({ workflowStep: step });
        updateContext(undefined, undefined, undefined, step, undefined, false, false);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            updateContext(undefined, undefined, undefined, undefined, undefined, false, false);
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
                        updateContext(
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            false,
                            false
                        );
                    }}
                >
                    Cancel
                </Button>
            </ModalButtonContainer>
        </div>
    );
};
