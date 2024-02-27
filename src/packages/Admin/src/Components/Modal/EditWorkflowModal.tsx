import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';

import { WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';
import { FormContainer, TextField } from '../../../../EdsForm';

const validationSchema = object().shape({
    name: string().max(255, 'The name must be less than 255 characters!').required('(Required)'),
});

export const EditWorkflowModal = (): JSX.Element => {
    const workflow = useAdminContext((s) => s.workflow);
    const { patchKey } = adminMutationKeys(workflow.id);

    const { editWorkflowMutation } = useAdminMutations();

    const { mutate } = useAdminMutation(workflow.id, patchKey, editWorkflowMutation);

    const onSubmit = async (values: FormikValues) => {
        mutate({ workflowId: workflow.id, name: values.name });
        workflow.name = values.name;

        updateContext({
            app: '',
            workflowOwner: '',
            workflow: workflow,
            workflowStep: {} as WorkflowStepTemplate,
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
            workflow: workflow,
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
            initialValues={{ name: workflow.name }}
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
