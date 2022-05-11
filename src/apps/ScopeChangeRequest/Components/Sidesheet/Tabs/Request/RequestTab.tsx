import { HotUpload } from '../../../Attachments/HotUpload';
import { Attachments } from '../../../DetailView/Attachments';
import { RelatedObjects } from '../../../DetailView/References';

import {
    FlexColumn,
    FormWrapper,
    InnerSection,
} from '../../SidesheetWrapper/SidesheetWrapper.styles';
import {
    SubSectionText,
    SectionHeading,
    Wrapper,
    SubSectionTitle,
    SectionWrapper,
} from './RequestTab.styles';
import styled from 'styled-components';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { Workflow } from '../../../Workflow/Workflow';
import { GuesstimateDisciplineDetails } from '../../GuesstimateDisciplineDetails/GuesstimateDisciplineDetails';
import { OriginLink } from '../../../DetailView/OriginLink';

export function RequestTab(): JSX.Element {
    const { request, requestAccess } = useScopeChangeContext();

    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Request</SectionHeading>

                        <SectionWrapper>
                            <SubSectionTitle>Description</SubSectionTitle>
                            <SubSectionText>{request.description}</SubSectionText>
                        </SectionWrapper>

                        <SectionHeading>Change origin</SectionHeading>
                        <SectionWrapper>
                            <SubSectionTitle>Origin</SubSectionTitle>
                            <SubSectionText>
                                <OriginLink
                                    type={request.originSource}
                                    id={request.originSourceId}
                                />
                            </SubSectionText>
                        </SectionWrapper>

                        <SectionHeading>Disciplines and guesstimates</SectionHeading>
                        <SectionWrapper>
                            <SubSectionText>
                                <GuesstimatesList>
                                    <GuesstimateRow>
                                        <SubSectionTitle>Discipline</SubSectionTitle>
                                        <SubSectionTitle>Guesstimate Mhrs</SubSectionTitle>
                                    </GuesstimateRow>
                                    {request.disciplineGuesstimates.map(
                                        ({ discipline, guesstimate, id }) => (
                                            <GuesstimateDisciplineDetails
                                                discipline={discipline}
                                                guesstimate={guesstimate}
                                                id={id}
                                                key={id}
                                            />
                                        )
                                    )}
                                </GuesstimatesList>
                            </SubSectionText>
                        </SectionWrapper>
                    </InnerSection>
                </FlexColumn>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>

                        <Workflow />
                    </InnerSection>
                </FlexColumn>

                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>References</SectionHeading>
                        <SectionWrapper>
                            <RelatedObjects
                                systems={request.systems}
                                commPkgs={request.commissioningPackages}
                                documents={request.documents}
                                areas={request.areas}
                                disciplines={request.disciplines}
                                tags={request.tags}
                            />
                        </SectionWrapper>
                    </InnerSection>
                    <InnerSection>
                        <SectionHeading>Attachments</SectionHeading>
                        <SectionWrapper>
                            {request.attachments.length === 0 && (
                                <NoAttachments>No attachments has been uploaded.</NoAttachments>
                            )}
                        </SectionWrapper>
                        {requestAccess.canPatch && <HotUpload />}
                        <Attachments attachments={request.attachments} requestId={request.id} />
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
}

const NoAttachments = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

const GuesstimatesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const GuesstimateRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.4px;
    text-align: left;
`;
