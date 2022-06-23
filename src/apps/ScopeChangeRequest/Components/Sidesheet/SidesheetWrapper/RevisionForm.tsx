import { useEffect } from 'react';
import styled from 'styled-components';
import { scopeChangeFormAtomApi } from '../../../Atoms/FormAtomApi/formAtomApi';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useUnpackRelatedObjects } from '../../../hooks/queries/useUnpackRelatedObjects';
import { RevisionAttachments } from '../../Attachments/RevisionAttachments';
import { ScopeChangeBaseForm } from '../../Form/BaseForm/ScopeChangeBaseForm';
import { GuesstimateDiscipline } from '../../Form/DisciplineGuesstimate/DisciplineGuesstimate';
import { FormBanner } from '../../Form/FormBanner/FormBanner';
import { MaterialsInput } from '../../Form/Inputs/MaterialsInput/MaterialsInput';
import { ScopeChangeReferences } from '../../Form/Inputs/ScopeChangeReferences/ScopeChangeReferences';
import { Section } from '../../Form/ScopeChangeForm.styles';
import { RevisionSubmitBar } from './RevisionSubmitBar';
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
                <div>
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
                </div>
            </Wrapper>
            <RevisionSubmitBar cancel={cancel} />
        </RevisionFormStyledWrapper>
    );
};

const RevisionFormStyledWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto 1fr auto;
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
