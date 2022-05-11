import { Button, Icon, Progress } from '@equinor/eds-core-react';

import { TypedSelectOption } from '../../api/Search/searchType';
import { useScopeChangeMutation } from '../../hooks/React-Query/useScopechangeMutation';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { SearchReferences } from '../SearchReferences/SearchReferences';
import { HotUpload } from '../Attachments/HotUpload';
import { tokens } from '@equinor/eds-tokens';
import { deleteAttachment } from '../../api/ScopeChange/Request/attachment';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { ScopeChangeBaseForm } from './BaseForm/ScopeChangeBaseForm';
import { useScopeChangeFormState } from '../../hooks/form/useScopeChangeFormState';
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

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    close,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const { patchKey, deleteAttachmentKey } = scopeChangeMutationKeys(request.id);
    const { mutate: removeAttachment } = useScopeChangeMutation(
        request.id,
        deleteAttachmentKey,
        deleteAttachment
    );

    const getReferences = () => state.references ?? [];
    const handleReferencesChanged = (references: TypedSelectOption[]) =>
        handleInput('references', references);
    useUnpackRelatedObjects({ getReferences, handleReferencesChanged, request });

    const { editScopeChangeMutation } = useRequestMutations();

    const { isLoading, mutate } = useScopeChangeMutation(
        request.id,
        patchKey,
        editScopeChangeMutation,
        {
            onSuccess: close,
        }
    );

    const { handleInput, isValid, state } = useScopeChangeFormState({
        ...request,
        attachments: [],
        disciplineGuesstimates: request.disciplineGuesstimates.map((x) => ({
            disciplineCode: x.discipline.procosysCode,
            guesstimateHours: x.guesstimate,
        })),
    });

    const handleSave = (setAsOpen: boolean) =>
        mutate({
            model: state,
            references: state.references ?? [],
            request: request,
            setAsOpen: setAsOpen,
        });

    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    Request
                    <ScopeChangeBaseForm
                        handleInput={handleInput}
                        state={state}
                        shouldDisableCategory
                    />
                    Disciplines and guesstimates
                    <GuesstimateDiscipline
                        state={state.disciplineGuesstimates ?? []}
                        updateFormValue={(guess) => handleInput('disciplineGuesstimates', guess)}
                    />
                </FlexColumn>

                <FlexColumn>
                    <Section>
                        <SearchReferences
                            handleReferencesChanged={handleReferencesChanged}
                            references={state.references ?? []}
                        />
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
            <ActionBar>
                <ButtonContainer>
                    {isLoading ? (
                        <Button disabled={true}>
                            <Progress.Dots color="primary" />
                        </Button>
                    ) : (
                        <>
                            <Button variant="outlined" onClick={disableEditMode}>
                                Cancel
                            </Button>
                            <Button disabled={!isValid} onClick={() => handleSave(false)}>
                                {isLoading ? <Progress.Dots color="primary" /> : 'Save'}
                            </Button>

                            {request.state === 'Draft' && (
                                <Button disabled={!isValid} onClick={() => handleSave(true)}>
                                    Submit
                                </Button>
                            )}
                        </>
                    )}
                </ButtonContainer>
            </ActionBar>
        </Wrapper>
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
