import { Button, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useRequestMutations } from '../../../hooks/mutations/useRequestMutations';
import { useUnpackRelatedObjects } from '../../../hooks/queries/useUnpackRelatedObjects';
import { HotUpload } from '../../Attachments/HotUpload';
import { RequestAttachmentsList } from '../../Attachments/RequestAttachmentsList/RequestAttachmentsList';
import { ScopeChangeBaseForm } from '../../Form/BaseForm/ScopeChangeBaseForm';
import { GuesstimateDiscipline } from '../../Form/DisciplineGuesstimate/DisciplineGuesstimate';
import { FormBanner } from '../../Form/FormBanner/FormBanner';
import { MaterialsInput } from '../../Form/Inputs/MaterialsInput/MaterialsInput';
import { ScopeChangeReferences } from '../../Form/Inputs/ScopeChangeReferences/ScopeChangeReferences';
import { ActionBar, ButtonContainer, Section } from '../../Form/ScopeChangeForm.styles';
import { FormWrapper, FlexColumn } from './SidesheetWrapper.styles';

interface RevisionFormProps {
    cancel: () => void;
}

export const RevisionForm = ({ cancel }: RevisionFormProps): JSX.Element => {
    const request = useScopeChangeContext(({ request }) => request);

    useEffect(() => {
        const { clearState, updateAtom } = scopeChangeFormAtomApi;
        clearState();
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
            <WarningRevisionBanner />
            <Wrapper>
                <FormWrapper>
                    <FlexColumn>
                        Request
                        <ScopeChangeBaseForm />
                        Disciplines and guesstimates
                        <GuesstimateDiscipline />
                        Materials
                        <MaterialsInput />
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
                <SubmitActionBar cancel={cancel} />
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

interface SubmitActionBarProps {
    cancel: () => void;
}

export const SubmitActionBar = ({ cancel }: SubmitActionBarProps): JSX.Element => {
    const request = useScopeChangeContext(({ request }) => request);

    const { createScopeChangeMutation } = useRequestMutations();

    const { prepareRequest } = scopeChangeFormAtomApi;
    const isValid = scopeChangeFormAtomApi.useIsValid();

    const { isLoading, mutate } = useMutation(createScopeChangeMutation);

    const createRevision = () =>
        mutate({ draft: false, model: { ...prepareRequest(), originatorId: request.id } });

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

const WarningRevisionBanner = () => {
    return (
        <WarningRevisionBannerWrapper>
            <InformationBanner>
                Creating the new revision will void the current revision of this request
            </InformationBanner>
        </WarningRevisionBannerWrapper>
    );
};

const WarningRevisionBannerWrapper = styled.div`
    padding: 20px;
`;

const InformationBanner = styled.div`
    background-color: ${tokens.colors.ui.background__info.hex};
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
    height: 36px;
    width: 100%;
`;
