import { Button, TextField } from '@equinor/eds-core-react';
import { KeyboardEventHandler, useState } from 'react';
import { openWorkflowStepSidesheet } from '../Workspace/WorkflowSteps';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

type CreateWorkflowStepModalProps = {
    setIsCreating: (isCreating: boolean) => void;
};

export const CreateStepModal = ({ setIsCreating }: CreateWorkflowStepModalProps): JSX.Element => {
    const [name, setName] = useState<string>('');

    async function createStep() {
        openWorkflowStepSidesheet({
            id: '',
            name: name,
            allowContributors: true,
            criterias: [],
            criteriaTemplates: [],
            order: 0,
            workflowStepCriteriaTemplates: [],
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
            createStep();
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
                        createStep();
                    }}
                    disabled={name === ''}
                >
                    Continue
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
