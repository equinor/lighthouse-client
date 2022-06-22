import { Button, Progress } from '@equinor/eds-core-react';
import { useMutation } from 'react-query';

import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useRequestMutations } from '../../../hooks/mutations/useRequestMutations';
import { ActionBar, ButtonContainer } from '../../Form/ScopeChangeForm.styles';

interface SubmitActionBarProps {
    cancel: () => void;
}

export const RevisionSubmitBar = ({ cancel }: SubmitActionBarProps): JSX.Element => {
    const request = useScopeChangeContext(({ request }) => request);

    const { createScopeChangeMutation } = useRequestMutations();

    const { prepareRequest } = scopeChangeFormAtomApi;
    const isValid = scopeChangeFormAtomApi.useIsValid();

    const { isLoading, mutate } = useMutation(createScopeChangeMutation);

    const createRevision = () =>
        mutate({
            draft: false,
            model: {
                ...prepareRequest(),
                attachmentsToDuplicate: request.attachments.map((s) => s.id),
                originatorId: request.id,
            },
        });

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
                            <Button variant="outlined" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button disabled={!isValid} onClick={createRevision}>
                                Create revision
                            </Button>
                        </>
                    )}
                </>
            </ButtonContainer>
        </ActionBar>
    );
};
