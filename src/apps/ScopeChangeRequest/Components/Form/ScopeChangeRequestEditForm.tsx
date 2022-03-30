import { Button, Icon, Progress } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { TypedSelectOption } from '../../Api/Search/searchType';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { HotUpload } from '../Attachments/HotUpload';
import { tokens } from '@equinor/eds-tokens';
import { deleteAttachment } from '../../Api/ScopeChange/Request/attachment';
import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { ScopeChangeBaseForm } from './ScopeChangeBaseForm';
import { useScopeChangeFormState } from './useScopeChangeFormState';
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
import { useRequestMutations } from '../../Hooks/useRequestMutations';
import { useUnpackRelatedObjects } from '../../Hooks/useUnpackRelatedObjects';

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

    useEffect(() => {
        return () => close();
    }, [request.id]);

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
                </FlexColumn>

                <FlexColumn>
                    <Section>
                        <RelatedObjectsSearch
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
                            <Button
                                disabled={!isValid}
                                onClick={() =>
                                    mutate({
                                        model: state,
                                        references: state.references ?? [],
                                        request: request,
                                    })
                                }
                            >
                                {isLoading ? <Progress.Dots color="primary" /> : 'Save'}
                            </Button>
                        </>
                    )}
                </ButtonContainer>
            </ActionBar>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
