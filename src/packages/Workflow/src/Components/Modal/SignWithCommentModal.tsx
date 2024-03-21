import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';

import {
  ButtonContainer,
  CriteriaSignState,
  OnSignStepAction,
  WorkflowSigningParams,
} from '@equinor/Workflow';

import { UseMutateFunction } from 'react-query';
import { resetSigningAtom } from '../Atoms/signingAtom';
import { FormContainer, TextField } from '../../../../EdsForm';

type SignWithCommentModalProps = {
  readonly action: CriteriaSignState;
  readonly buttonText: string;
  readonly stepId: string;
  readonly criteriaId: string;
  readonly requestId: string;
  useWorkflowSigning(
    props: WorkflowSigningParams
  ): UseMutateFunction<void, unknown, OnSignStepAction, unknown>;
};

const validationSchema = object().shape({
  comment: string()
    .max(4000, 'The comment must be less than 4000 characters!')
    .required('(Required)'),
});

export const SignWithCommentModal = ({
  action,
  buttonText,
  stepId,
  criteriaId,
  requestId,
  useWorkflowSigning,
}: SignWithCommentModalProps): JSX.Element => {
  const signMutation = useWorkflowSigning({
    criteriaId: criteriaId,
    requestId: requestId,
    stepId: stepId,
  });

  const onSubmit = async (values: FormikValues) => {
    signMutation({
      action: action,
      comment: values.comment,
    });
    resetSigningAtom();
  };

  const onCancel = () => {
    resetSigningAtom();
  };

  return (
    <FormContainer
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      {({ isValid, submitForm }) => (
        <Form>
          <TextField id="comment" name="comment" label="Comment" multiline autoFocus={true} />

          <ButtonContainer>
            <Button variant="contained" disabled={!isValid} onClick={submitForm}>
              {buttonText} with comment
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </FormContainer>
  );
};
