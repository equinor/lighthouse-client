import { Button, Progress } from '@equinor/eds-core-react';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useRequestMutations } from '../../../hooks/mutations/useRequestMutations';
import { useUnpackRelatedObjects } from '../../../hooks/queries/useUnpackRelatedObjects';
import { RevisionAttachments } from '../../Attachments/RevisionAttachments';
import { ScopeChangeBaseForm } from '../../Form/BaseForm/ScopeChangeBaseForm';
import { GuesstimateDiscipline } from '../../Form/DisciplineGuesstimate/DisciplineGuesstimate';
import { FormBanner } from '../../Form/FormBanner/FormBanner';
import { MaterialsInput } from '../../Form/Inputs/MaterialsInput/MaterialsInput';
import { ScopeChangeReferences } from '../../Form/Inputs/ScopeChangeReferences/ScopeChangeReferences';
import { ActionBar, ButtonContainer, Section } from '../../Form/ScopeChangeForm.styles';
import { FormWrapper, FlexColumn } from './SidesheetWrapper.styles';
import { WarningRevisionBanner } from './WarningCreateRevisionBanner';

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
            revisionAttachments: request.attachments,
            attachmentsToDuplicate: request.attachments.map((s) => s.id),
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
        <RevisionFormStyledWrapper>
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
                        <RevisionAttachments />
                    </FlexColumn>
                </FormWrapper>
            </Wrapper>
            <SubmitActionBar cancel={cancel} />
        </RevisionFormStyledWrapper>
    );
};

const RevisionFormStyledWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
    height: 100%;
    font-size: 14px;
`;

const Wrapper = styled.div`
    margin: 24px 32px;
    height: 100%;
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
        mutate({
            draft: false,
            model: {
                ...prepareRequest(),
                attachmentsToDuplicate: request.attachments.map((s) => s.id),
                originatorId: request.id,
            },
        });

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
