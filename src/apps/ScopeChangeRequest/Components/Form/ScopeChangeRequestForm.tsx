import styled from 'styled-components';
import { Button, CircularProgress, SingleSelect } from '@equinor/eds-core-react';

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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getScopeChangeById } from '../../api/ScopeChange/Request';
import { SidesheetApi } from '@equinor/sidesheet';
import { useRequestMutations } from '../../hooks/mutations/useRequestMutations';
import { SidesheetWrapper } from '../Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { Banner, BannerItem } from '../Sidesheet/SidesheetBanner/SidesheetBanner';
import { scopeChangeQueries } from '../../keys/queries';
import { GuesstimateDiscipline } from './DisciplineGuesstimate/DisciplineGuesstimate';

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

interface CreateBannerInputsProps {
    state: Partial<ScopeChangeFormModel>;
    handleInput: (key: keyof ScopeChangeFormModel, value: unknown) => void;
}

export const CreateBannerInputs = ({
    state,
    handleInput,
}: CreateBannerInputsProps): JSX.Element => {
    const { phaseQuery, categoryQuery, scopeQuery } = scopeChangeQueries;
    const { data: phases } = useQuery(phaseQuery);
    const { data: categories } = useQuery(categoryQuery);
    const { data: scopes } = useQuery(scopeQuery);

    return (
        <div>
            <Banner>
                <BannerItem
                    title=""
                    value={
                        <SingleSelect
                            items={phases ?? []}
                            label={'Phase'}
                            meta="(Required)"
                            initialSelectedItem={state.phase}
                            placeholder="Select phase"
                            handleSelectedItemChange={(change) =>
                                handleInput('phase', change.selectedItem)
                            }
                        />
                    }
                />

                <BannerItem
                    title=""
                    value={
                        <SingleSelect
                            items={categories?.map(({ name }) => name) ?? []}
                            label={'Change category'}
                            meta="(Required)"
                            initialSelectedItem={state.changeCategory?.name}
                            placeholder="Select category"
                            disabled={false}
                            handleSelectedItemChange={(change) =>
                                handleInput(
                                    'changeCategory',
                                    categories?.find(({ name }) => name === change.selectedItem)
                                )
                            }
                        />
                    }
                />

                <BannerItem
                    title=""
                    value={
                        <SingleSelect
                            items={scopes?.map(({ name }) => name) ?? []}
                            label={'Scope'}
                            meta="(Required)"
                            initialSelectedItem={state.scopeId}
                            placeholder="Select scope"
                            disabled={false}
                            handleSelectedItemChange={(change) =>
                                handleInput(
                                    'scopeId',
                                    scopes?.find(({ name }) => name === change.selectedItem)?.id
                                )
                            }
                        />
                    }
                />

                <BannerItem title="State" value={<div>Draft</div>} />
            </Banner>
        </div>
    );
};
