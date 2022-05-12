import styled from 'styled-components';

import { TypedSelectOption } from '../../api/Search/searchType';
import { Upload } from '../Attachments/Upload';
import { SearchReferences } from '../SearchReferences/SearchReferences';
import { usePreloadCaching } from '../../hooks/React-Query/usePreloadCaching';
import {
    ScopeChangeFormModel,
    useScopeChangeFormState,
} from '../../hooks/form/useScopeChangeFormState';
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
import { useRequestMutations } from '../../hooks/mutations/useRequestMutations';
import { SidesheetWrapper } from '../Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { GuesstimateDiscipline } from './DisciplineGuesstimate/DisciplineGuesstimate';
import { SidesheetApi } from '@equinor/sidesheet';
import { Button, CircularProgress } from '@equinor/eds-core-react';
import { CreateBannerInputs } from './CreateBannerInputs/CreateBannerInputs';

interface ScopeChangeRequestFormProps {
    actions: SidesheetApi;
}

export const ScopeChangeRequestForm = ({
    actions: { swapComponent },
}: ScopeChangeRequestFormProps): JSX.Element => {
    const { handleInput, isValid, state } = useScopeChangeFormState();
    const { createScopeChangeMutation } = useRequestMutations();
    const queryClient = useQueryClient();

    const handleChange = (key: keyof ScopeChangeFormModel, value: unknown) => {
        handleInput(key, value);
    };

    usePreloadCaching();

    const handleReferencesChanged = (references: TypedSelectOption[]) =>
        handleChange('references', references);

    const handleAttachmentsChanged = (attachments: File[]) =>
        handleChange('attachments', attachments);

    const redirect = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        swapComponent(SidesheetWrapper, await getScopeChangeById(scopeChangeId));
        queryClient.invalidateQueries();
    };

    const { mutate, isLoading } = useMutation(createScopeChangeMutation, {
        retry: 0,
        onSuccess: (id) => {
            id && redirect(id);
            if (!id) throw 'error';
        },
    });

    const onMutate = (draft: boolean) =>
        mutate({
            draft: draft,
            model: {
                ...state,
                disciplineGuesstimates: state?.disciplineGuesstimates?.filter(
                    ({ disciplineCode }) => disciplineCode !== ''
                ),
            },
            references: state.references ?? [],
        });

    return (
        <>
            <div>
                <CreateBannerInputs handleInput={handleInput} state={state} />
                <br />
                <FormWrapper>
                    <FlexColumn>
                        Request
                        <ScopeChangeBaseForm handleInput={handleChange} state={state} />
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
                    <FlexColumn>
                        Disciplines and guesstimates
                        <GuesstimateDiscipline
                            state={state.disciplineGuesstimates ?? []}
                            updateFormValue={(guess) =>
                                handleInput('disciplineGuesstimates', guess)
                            }
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
