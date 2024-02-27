import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';

import { Workflow, WorkflowStepTemplate } from '@equinor/Workflow';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';
import { FormContainer, TextField } from '../../../../EdsForm';

type EditWorkflowStatusModalProps = {
    readonly setIsEditing: (isCreating: boolean) => void;
};

const validationSchema = object().shape({
    name: string().max(255, 'The name must be less than 255 characters!').required('(Required)'),
});

export const EditStatusModal = ({ setIsEditing }: EditWorkflowStatusModalProps): JSX.Element => {
    const status = useAdminContext((s) => s.status);

    const { patchKey } = adminMutationKeys(status.id);

    const { editWorkflowStatusMutation } = useAdminMutations();

    const { mutate } = useAdminMutation(status.id, patchKey, editWorkflowStatusMutation);

    const onSubmit = async (values: FormikValues) => {
        mutate({ id: status.id, name: values.name });
        updateContext({
            app: '',
            workflowOwner: '',
            workflow: {} as Workflow,
            workflowStep: {} as WorkflowStepTemplate,
            status: { ...status, name: values.name },
            isEditingWorkflow: false,
            isEditingStep: false,
            deletingWorkflow: false,
            deletingStep: false,
            deletingStatus: false,
        });

        setIsEditing(false);
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    return (
        <FormContainer
            initialValues={status}
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
