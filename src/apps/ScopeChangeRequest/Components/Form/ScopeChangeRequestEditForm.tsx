import { Button, Icon, Progress } from '@equinor/eds-core-react';

import { useScopeChangeMutation } from '../../hooks/React-Query/useScopechangeMutation';
import { SearchReferences } from '../SearchReferences/SearchReferences';
import { HotUpload } from '../Attachments/HotUpload';
import { tokens } from '@equinor/eds-tokens';
import { deleteAttachment } from '../../api/ScopeChange/Request/attachment';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { ScopeChangeBaseForm } from './BaseForm/ScopeChangeBaseForm';
import {
    ActionBar,
    AttachmentName,
    AttachmentsList,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
    Inline,
    Section,
} from './ScopeChangeForm.styles';
import styled from 'styled-components';
import { useRequestMutations } from '../../hooks/mutations/useRequestMutations';
import { useUnpackRelatedObjects } from '../../hooks/queries/useUnpackRelatedObjects';
import { disableEditMode } from '../../Atoms/editModeAtom';
import { GuesstimateDiscipline } from './DisciplineGuesstimate/DisciplineGuesstimate';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';
import { useEffect } from 'react';
import { FormBanner } from './FormBanner/FormBanner';

export const ScopeChangeRequestEditForm = (): JSX.Element => {
    const request = useScopeChangeContext(({ request }) => request);

    const { deleteAttachmentKey } = scopeChangeMutationKeys(request.id);
    const { mutate: removeAttachment } = useScopeChangeMutation(
        request.id,
        deleteAttachmentKey,
        deleteAttachment
    );

    useEffect(() => {
        const { updateAtom } = scopeChangeFormAtomApi;
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
            updateAtom(null);
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
                            <SearchReferences />
                        </Section>
                        Attachments
                        <HotUpload />
                        {request.attachments.map((attachment, i) => {
                            return (
                                <AttachmentsList key={i}>
                                    <AttachmentName>{attachment.fileName}</AttachmentName>
                                    <Inline>
                                        <div>
                                            {attachment.fileSize &&
                                                (attachment?.fileSize / 1000 ** 2).toFixed(2)}
                                            MB
                                        </div>
                                        <Icon
                                            style={{ margin: '0em 0.5em' }}
                                            color={tokens.colors.interactive.primary__resting.rgba}
                                            onClick={() =>
                                                removeAttachment({
                                                    requestId: request.id,
                                                    attachmentId: attachment.id,
                                                })
                                            }
                                            name="clear"
                                        />
                                    </Inline>
                                </AttachmentsList>
                            );
                        })}
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
                        <Progress.Dots />
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
