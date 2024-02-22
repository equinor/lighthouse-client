import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';

import { useMutation } from 'react-query';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';
import { FormContainer, TextField } from '../../../../EdsForm';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'The name must be less than 255 characters!')
        .required('(Required)'),
});

export const EditStepModal = (): JSX.Element => {
    const step = useAdminContext((s) => s.workflowStep);

    const { editWorkflowStepMutation } = useAdminMutations();

    const { mutate } = useMutation(editWorkflowStepMutation);

    const onSubmit = async (values: FormikValues) => {
        mutate({ workflowStep: { ...step, name: values.name }, saveAndClose: false });
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
    };

    const onCancel = () => {
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
    };

    return (
        <FormContainer
            initialValues={step}
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
                            autoFocus={true}
                            placeholder="Write a name for the step"
                        />
                    </ModalInputContainer>
                    <ModalButtonContainer>
                        <Button type="submit" variant="contained" disabled={!isValid}>
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
