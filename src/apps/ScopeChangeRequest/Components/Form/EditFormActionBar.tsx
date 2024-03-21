import { Button, Progress } from '@equinor/eds-core-react-old';
import { disableEditMode } from '../../Atoms/editModeAtom';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';
import { useRequestMutations } from '../../hooks/mutations/useRequestMutations';
import { useScopeChangeMutation } from '../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { ActionBar, ButtonContainer } from './ScopeChangeForm.styles';

export const EditFormActionBar = (): JSX.Element => {
  const request = useScopeChangeContext(({ request }) => request);
  const { patchKey } = scopeChangeMutationKeys(request.id);

  const isValid = scopeChangeFormAtomApi.useIsValid();

  const { editScopeChangeMutation } = useRequestMutations();

  const { isLoading, mutate } = useScopeChangeMutation(
    request.id,
    patchKey,
    editScopeChangeMutation,
    {
      onSuccess: disableEditMode,
    }
  );

  const handleSave = (setAsOpen: boolean) => {
    const { prepareRequest } = scopeChangeFormAtomApi;
    mutate({
      model: prepareRequest(),
      setAsOpen: setAsOpen,
    });
  };

  return (
    <ActionBar>
      <ButtonContainer>
        <>
          {isLoading ? (
            <Button variant="ghost_icon" disabled>
              <Progress.Dots color="primary" />
            </Button>
          ) : (
            <>
              <Button variant="outlined" onClick={disableEditMode}>
                Cancel
              </Button>
              <Button disabled={!isValid} onClick={() => handleSave(false)}>
                Save
              </Button>
              {request.state === 'Draft' && (
                <Button disabled={!isValid} onClick={() => handleSave(true)}>
                  Submit
                </Button>
              )}
            </>
          )}
        </>
      </ButtonContainer>
    </ActionBar>
  );
};
