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
import { Button, Progress } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { scopeChangeCreateContext } from '../DataCreator/DataCreatorWrapper';

export const ScopeChangeRequestForm = (): JSX.Element => {
    usePreloadCaching();

    return (
        <>
            <div>
                <br />
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
                    </FlexColumn>
                </FormWrapper>
                <SubmitButtonBar />
            </div>
        </>
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
                        <Progress.Dots />
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
