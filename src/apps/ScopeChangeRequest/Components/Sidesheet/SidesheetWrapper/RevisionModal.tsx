import { Button, TextField } from '@equinor/eds-core-react-old';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useRequestMutations } from '../../../hooks/mutations/useRequestMutations';
import { Loading } from './Loading';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em;
  align-items: center;
  gap: 0.5em;
`;
type RevisionModalProps = {
  closeModal: () => void;
};
export const RevisionModal = ({ closeModal }: RevisionModalProps): JSX.Element => {
  const [reasonRevision, setReasonRevision] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReasonRevision(e.target.value);
  };
  const { request, actions } = useScopeChangeContext();
  const { prepareRequest } = scopeChangeFormAtomApi;

  const { createScopeChangeMutation } = useRequestMutations();
  const { mutate, isLoading } = useMutation(createScopeChangeMutation, {
    onSuccess: () => closeModal(),
  });

  const createRevision = () => {
    actions.setHasUnsavedChanges(false);
    mutate({
      draft: false,
      model: {
        ...prepareRequest(),
        attachmentsToDuplicate: request.attachments.map((s) => s.id),
        originatorId: request.id,
        newRevisionOrVoidReason: reasonRevision,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <InputContainer>
        <TextField
          variant="default"
          id="revisionTextModal"
          label="Reason for creating a revision"
          value={reasonRevision}
          onChange={handleOnChange}
          multiline
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          disabled={reasonRevision.length === 0}
          variant="contained"
          onClick={() => {
            createRevision();
          }}
        >
          Create revision
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setReasonRevision('');
            closeModal();
          }}
        >
          Cancel
        </Button>
      </ButtonContainer>
    </>
  );
};
