import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';

import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';
import { TextField, FormContainer } from '../../../../EdsForm';

const validationSchema = object().shape({
    name: string().max(255, 'The name must be less than 255 characters!').required('(Required)'),
});

type CreateWorkflowModalProps = {
    readonly setIsCreating: (isCreating: boolean) => void;
};

export const CreateWorkflowModal = ({ setIsCreating }: CreateWorkflowModalProps): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { createWorkflowMutation } = useAdminMutations();

    const { postKey } = adminMutationKeys('');

    const { mutate } = useAdminMutation('', postKey, createWorkflowMutation);

    const onSubmit = async (values: FormikValues) => {
        mutate({
            workflow: { id: '', name: values.name, changeCategory: null, owner: workflowOwner },
        });
        setIsCreating(false);
    };

    const onCancel = () => {
        setIsCreating(false);
    };

    return (
        <FormContainer
            initialValues={{ name: '' }}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={onSubmit}
        >
            {({ isValid }) => (
                <Form>
                    <ModalInputContainer>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            multiline
                            placeholder="Write a name for the workflow"
                        />
                    </ModalInputContainer>
                    <ModalButtonContainer>
                        <Button type="submit" variant="contained" disabled={!isValid}>
                            Create
                        </Button>
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                    </ModalButtonContainer>
                </Form>
            )}
        </FormContainer>
    );
};
