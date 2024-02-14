import { Button, TextField } from '@equinor/eds-core-react-old';
import { KeyboardEventHandler, useState } from 'react';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

type CreateWorkflowStatusModalProps = {
    setIsCreating: (isCreating: boolean) => void;
};

export const CreateStatusModal = ({
    setIsCreating,
}: CreateWorkflowStatusModalProps): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const [name, setName] = useState<string>('');

    const { createWorkflowStatusMutation } = useAdminMutations();

    const { postKey } = adminMutationKeys('');

    const { mutate } = useAdminMutation('', postKey, createWorkflowStatusMutation);

    async function createStatus() {
        mutate({
            name: name,
            workflowOwner: workflowOwner,
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
            createStatus();
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
                    placeholder={'Write a name for the status'}
                />
            </ModalInputContainer>

            <ModalButtonContainer>
                <Button
                    variant="contained"
                    onClick={async () => {
                        createStatus();
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
