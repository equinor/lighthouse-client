import styled from 'styled-components';

import { Upload } from '../Attachments/Upload';
import { SearchReferences } from '../SearchReferences/SearchReferences';
import { usePreloadCaching } from '../../hooks/React-Query/usePreloadCaching';
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
import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { scopeChangeCreateContext } from '../DataCreator/DataCreatorWrapper';
import { StyledCheckbox } from './StyledCheckbox/StyledCheckbox';

export const ScopeChangeRequestForm = (): JSX.Element => {
    usePreloadCaching();

    return (
        <div>
            <FormWrapper>
                <FlexColumn>
                    Request
                    <ScopeChangeBaseForm />
                </FlexColumn>
                <FlexColumn>
                    <Section>
                        <SearchReferences />
                    </Section>
                    Attachments
                    <Upload />
                </FlexColumn>
                <FlexColumn>
                    Disciplines and guesstimates
                    <GuesstimateDiscipline />
                    Materials
                    <MaterialsInput />
                </FlexColumn>
            </FormWrapper>
            <SubmitButtonBar />
        </div>
    );
};

const SubmitButtonBar = () => {
    const swapComponent = scopeChangeCreateContext.useAtomState(
        ({ swapComponent }) => swapComponent
    );

    const { useIsValid } = scopeChangeFormAtomApi;

    const isValid = useIsValid();

    const { createScopeChangeMutation } = useRequestMutations();
    const queryClient = useQueryClient();
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

    const onMutate = (draft: boolean) => {
        const { prepareRequest } = scopeChangeFormAtomApi;

        mutate({
            draft: draft,
            model: prepareRequest(),
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
                </>
            </ButtonContainer>
        </ActionBar>
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

const MaterialsInput = (): JSX.Element => {
    const { useAtomState, updateAtom } = scopeChangeFormAtomApi;

    const materials = useAtomState((s) => s.materials);

    const updateIdentifiedInStorage = () => {
        updateAtom({
            materials: {
                ...materials,
                isIdentified: !materials?.isIdentified,
            },
        });
    };

    const updateToBeBought = () => {
        updateAtom({
            materials: {
                ...materials,
                isToBeBoughtByContractor: !materials?.isToBeBoughtByContractor,
            },
        });
    };

    const updateMaterialDescription = (value: string | undefined) => {
        updateAtom({
            materials: {
                ...materials,
                materialNote: value,
            },
        });
    };

    return (
        <div>
            <StyledCheckbox
                onChange={updateIdentifiedInStorage}
                value={materials?.isIdentified}
                label="Materials identified in storage"
            />

            <StyledCheckbox
                onChange={updateToBeBought}
                value={materials?.isToBeBoughtByContractor}
                label={'Materials to be bought by contractor'}
            />

            <TextField
                id={(Math.random() * 16).toString()}
                multiline
                rows={3}
                onInput={(e) => updateMaterialDescription(e.target.value)}
                label="Material note"
                placeholder="Please add description"
            />
        </div>
    );
};
