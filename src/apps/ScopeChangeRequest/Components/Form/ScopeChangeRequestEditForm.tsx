import { Button, Progress } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { useScopeChangeMutation } from '../../hooks/React-Query/useScopechangeMutation';
import { SearchReferences } from '../SearchReferences/SearchReferences';
import { HotUpload } from '../Attachments/HotUpload';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { ScopeChangeBaseForm } from './BaseForm/ScopeChangeBaseForm';
import {
    ActionBar,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
    Section,
} from './ScopeChangeForm.styles';
import styled from 'styled-components';
import { useRequestMutations } from '../../hooks/mutations/useRequestMutations';
import { useUnpackRelatedObjects } from '../../hooks/queries/useUnpackRelatedObjects';
import { disableEditMode } from '../../Atoms/editModeAtom';
import { GuesstimateDiscipline } from './DisciplineGuesstimate/DisciplineGuesstimate';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';
import { FormBanner } from './FormBanner/FormBanner';
import { RequestAttachmentsList } from '../Attachments/RequestAttachmentsList/RequestAttachmentsList';
import { ScopeChangeReferences } from './Inputs/ScopeChangeReferences/ScopeChangeReferences';

export const ScopeChangeRequestEditForm = (): JSX.Element => {
    const request = useScopeChangeContext(({ request }) => request);

    useEffect(() => {
        const { clearState, updateAtom } = scopeChangeFormAtomApi;
        updateAtom({
            ...request,
            disciplineGuesstimates: request.disciplineGuesstimates.map(
                ({ discipline: { procosysCode }, guesstimate }) => ({
                    disciplineCode: procosysCode,
                    guesstimateHours: guesstimate,
                })
            ),
        });
        return () => {
            clearState();
        };
    }, []);

    useUnpackRelatedObjects({ request });

    return (
        <>
            <FormBanner />
            <Wrapper>
                <FormWrapper>
                    <FlexColumn>
                        Request
                        <ScopeChangeBaseForm />
                        Disciplines and guesstimates
                        <GuesstimateDiscipline />
                    </FlexColumn>

                    <FlexColumn>
                        <Section>
                            <ScopeChangeReferences />
                        </Section>
                        Attachments
                        <HotUpload />
                        <RequestAttachmentsList />
                    </FlexColumn>
                </FormWrapper>
                <SubmitActionBar />
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin: 24px 32px;
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const SubmitActionBar = (): JSX.Element => {
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
