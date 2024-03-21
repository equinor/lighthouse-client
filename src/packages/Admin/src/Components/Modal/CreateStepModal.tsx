import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';

import { openWorkflowStepSidesheet } from '../Workspace/WorkflowSteps';
import { ModalButtonContainer, ModalInputContainer } from './modalStyles';
import { TextField, FormContainer } from '../../../../EdsForm';

const validationSchema = object().shape({
  name: string().max(255, 'The name must be less than 255 characters!').required('(Required)'),
});

type CreateWorkflowStepModalProps = {
  readonly setIsCreating: (isCreating: boolean) => void;
};

export const CreateStepModal = ({ setIsCreating }: CreateWorkflowStepModalProps): JSX.Element => {
  const onSubmit = async (values: FormikValues) => {
    openWorkflowStepSidesheet({
      id: '',
      name: values.name,
      allowContributors: true,
      criterias: [],
      criteriaTemplates: [],
      order: 0,
      workflowStepCriteriaTemplates: [],
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
              autoFocus={true}
              placeholder="Write a name for the step"
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
