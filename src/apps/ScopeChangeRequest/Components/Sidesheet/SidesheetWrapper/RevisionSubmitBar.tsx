import { Button } from '@equinor/eds-core-react-old';
import { Modal } from '@equinor/modal';
import { useState } from 'react';

import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { ActionBar, ButtonContainer } from '../../Form/ScopeChangeForm.styles';
import { RevisionModal } from './RevisionModal';

interface SubmitActionBarProps {
  cancel: () => void;
}

export const RevisionSubmitBar = ({ cancel }: SubmitActionBarProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isValid = scopeChangeFormAtomApi.useIsValid();

  return (
    <>
      <ActionBar>
        <ButtonContainer>
          <>
            <Button variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button disabled={!isValid} onClick={() => setIsModalOpen(true)}>
              Create revision
            </Button>
          </>
        </ButtonContainer>
      </ActionBar>
      {isModalOpen && (
        <Modal
          title="Create revision"
          content={<RevisionModal closeModal={() => setIsModalOpen(false)} />}
        />
      )}
    </>
  );
};
