import { Button, TextField } from '@equinor/eds-core-react';
import { KeyboardEventHandler, useState } from 'react';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

type EditWorkflowStatusModalProps = {
    setIsEditing: (isCreating: boolean) => void;
};

export const EditStatusModal = ({ setIsEditing }: EditWorkflowStatusModalProps): JSX.Element => {
    const status = useAdminContext((s) => s.status);
    const [name, setName] = useState<string>(status.name);
    const { patchKey } = adminMutationKeys(status.id);

    const { editWorkflowStatusMutation } = useAdminMutations();

    const { mutate } = useAdminMutation(status.id, patchKey, editWorkflowStatusMutation);

    async function editStatus() {
        mutate({ id: status.id, name: name });
        status.name = name;
        updateContext(undefined, undefined, undefined, undefined, status, false, false);
        setIsEditing(false);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            setIsEditing(false);
        }
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey && name !== '') {
            event.preventDefault();
            editStatus();
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
                        editStatus();
                    }}
                    disabled={name === ''}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setIsEditing(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalButtonContainer>
        </div>
    );
};
