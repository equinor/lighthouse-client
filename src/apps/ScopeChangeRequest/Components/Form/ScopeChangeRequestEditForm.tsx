import { useEffect } from 'react';

import { HotUpload } from '../Attachments/HotUpload';
import { ScopeChangeBaseForm } from './BaseForm/ScopeChangeBaseForm';
import { FlexColumn, FormWrapper, Section } from './ScopeChangeForm.styles';
import styled from 'styled-components';
import { useUnpackRelatedObjects } from '../../hooks/queries/useUnpackRelatedObjects';
import { GuesstimateDiscipline } from './DisciplineGuesstimate/DisciplineGuesstimate';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';
import { FormBanner } from './FormBanner/FormBanner';
import { RequestAttachmentsList } from '../Attachments/RequestAttachmentsList/RequestAttachmentsList';
import { MaterialsInput } from './Inputs/MaterialsInput/MaterialsInput';
import { ScopeChangeReferences } from './Inputs/ScopeChangeReferences/ScopeChangeReferences';
import { EditFormActionBar } from './EditFormActionBar';
import { CheckboxWrapper } from '../WarrantyCaseDetailCheckbox/warrantyCaseDetailCheckbox.styles';
import { IsATSScopeCheckbox } from './Inputs/AtsScopeCheckbox';

export const ScopeChangeRequestEditForm = (): JSX.Element => {
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
    }, [request]);

    useUnpackRelatedObjects({ request });

    return (
        <EditFormWrapper>
            <FormBanner state={request.state} />
            <Wrapper>
                <FormWrapper>
                    <FlexColumn>
                        Request
                        <ScopeChangeBaseForm />
                        Disciplines and guesstimates
                        <CheckboxWrapper>
                            <IsATSScopeCheckbox />
                        </CheckboxWrapper>
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
            </Wrapper>
            <EditFormActionBar />
        </EditFormWrapper>
    );
};

const EditFormWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
    height: 100%;
`;

const Wrapper = styled.div`
    margin: 24px 32px;
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
`;
