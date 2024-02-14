import { Button, TextField } from '@equinor/eds-core-react-old';
import { KeyboardEventHandler, useState } from 'react';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

type CreateWorkflowModalProps = {
    setIsCreating: (isCreating: boolean) => void;
};

export const CreateWorkflowModal = ({ setIsCreating }: CreateWorkflowModalProps): JSX.Element => {
    const [name, setName] = useState<string>('');
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { createWorkflowMutation } = useAdminMutations();

    const { postKey } = adminMutationKeys('');

    const { mutate } = useAdminMutation('', postKey, createWorkflowMutation);

    async function createWorkflow() {
        mutate({
            workflow: { id: '', name: name, changeCategory: null, owner: workflowOwner },
        });
        setIsCreating(false);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            setIsCreating(false);
        }
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey && name !== '') {
            event.preventDefault();
            createWorkflow();
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
                        createWorkflow();
                    }}
                    disabled={name === ''}
                >
                    Create
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setIsCreating(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalButtonContainer>
        </div>
    );
};
