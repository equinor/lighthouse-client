import styled from 'styled-components';
import { Button, CircularProgress } from '@equinor/eds-core-react';

import { TypedSelectOption } from '../../api/Search/searchType';
import { Upload } from '../Attachments/Upload';
import { SearchReferences } from '../SearchReferences/SearchReferences';
import { usePreloadCaching } from '../../hooks/React-Query/usePreloadCaching';
import { useScopeChangeFormState } from '../../hooks/form/useScopeChangeFormState';
import { ScopeChangeBaseForm } from './BaseForm/ScopeChangeBaseForm';
import {
    ActionBar,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
    Section,
} from './ScopeChangeForm.styles';
import { useMutation, useQueryClient } from 'react-query';
import { getScopeChangeById } from '../../api/ScopeChange/Request';
import { openSidesheet } from '@equinor/sidesheet';
import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { useRequestMutations } from '../../hooks/mutations/useRequestMutations';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';
import { SidesheetWrapper } from '../Sidesheet/SidesheetWrapper/SidesheetWrapper';

interface ScopeChangeRequestFormProps {
    closeScrim: () => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const { handleInput, isValid, state } = useScopeChangeFormState();
    const { createScopeChangeMutation } = useRequestMutations();
    const queryClient = useQueryClient();

    usePreloadCaching();

    const handleReferencesChanged = (references: TypedSelectOption[]) =>
        handleInput('references', references);

    const handleAttachmentsChanged = (attachments: File[]) =>
        handleInput('attachments', attachments);

    const redirect = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        openSidesheet(SidesheetWrapper, await getScopeChangeById(scopeChangeId), 'change');
        clearActiveFactory();
        queryClient.invalidateQueries();
    };

    const { mutate, isLoading } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
        onSuccess: (id) => {
            id && redirect(id);
            if (!id) throw 'error';
        },
    });

    const onMutate = (draft: boolean) =>
        mutate({ draft: draft, model: state, references: state.references ?? [] });

    return (
        <>
            <div>
                <TitleHeader>
                    <SidesheetTitle>Create scope change request</SidesheetTitle>
                    <ClickableIcon name="close" onClick={closeScrim} />
                </TitleHeader>

                <FormWrapper>
                    <FlexColumn>
                        Request
                        <ScopeChangeBaseForm handleInput={handleInput} state={state} />
                    </FlexColumn>

                    <FlexColumn>
                        <Section>
                            <SearchReferences
                                handleReferencesChanged={handleReferencesChanged}
                                references={state.references ?? []}
                            />
                        </Section>
                        Attachments
                        <Upload
                            attachments={state.attachments ?? []}
                            handleAttachmentsChanged={handleAttachmentsChanged}
                        />
                    </FlexColumn>
                </FormWrapper>
            </div>
            <ActionBar>
                <ButtonContainer>
                    {isLoading ? (
                        <Button variant="ghost_icon">
                            <CircularProgress size={32} color="primary" />
                        </Button>
                    ) : (
                        <>
                            <Button disabled={!isValid} onClick={() => onMutate(false)}>
                                Submit
                            </Button>
                            <Button
                                disabled={!isValid}
                                onClick={() => onMutate(true)}
                                variant="outlined"
                            >
                                Save
                            </Button>
                        </>
                    )}
                </ButtonContainer>
            </ActionBar>
        </>
    );
};

export const SidesheetTitle = styled.span`
    font-size: 28px;
`;

export const Title = styled.div`
    line-height: 24px;
    font-size: 18px;
    color: black;
    font-weight: bold;
`;

const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0em;
`;
