import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import * as Yup from 'yup';

import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';

import { FormContainer, TextField } from '../../../../EdsForm';

type CreateWorkflowStatusModalProps = {
    readonly setIsCreating: (isCreating: boolean) => void;
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'The name must be less than 255 characters!')
        .required('(Required)'),
});

export const CreateStatusModal = ({
    setIsCreating,
}: CreateWorkflowStatusModalProps): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { createWorkflowStatusMutation } = useAdminMutations();
    const { postKey } = adminMutationKeys('');
    const { mutate } = useAdminMutation('', postKey, createWorkflowStatusMutation);

    const onSubmit = async (values: FormikValues) => {
        mutate({ name: values.name, workflowOwner: workflowOwner });
        setIsCreating(false);
    };

    const onCancel = () => {
        setIsCreating(false);
    };

    return (
        <FormContainer
            initialValues={{}}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={onSubmit}
        >
            {({ isValid, submitForm }) => (
                <Form>
                    <ModalInputContainer>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            multiline
                            autoFocus={true}
                            placeholder="Write a name for the status"
                        />
                    </ModalInputContainer>
                    <ModalButtonContainer>
                        <Button variant="contained" disabled={!isValid} onClick={submitForm}>
                            Save
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
