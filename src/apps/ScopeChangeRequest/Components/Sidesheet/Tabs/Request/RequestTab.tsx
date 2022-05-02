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
    SiblingWrapper,
} from './RequestTab.styles';
import styled from 'styled-components';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { WorkflowWithLines } from '../../../Workflow/Workflow';

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

                        <SiblingWrapper>
                            <SectionWrapper>
                                <SubSectionTitle>Guesstimate description</SubSectionTitle>
                                <SubSectionText>{request.guesstimateDescription}</SubSectionText>
                            </SectionWrapper>
                            <SectionWrapper>
                                <SubSectionTitle>Guesstimate</SubSectionTitle>
                                <SubSectionText>
                                    {request.guesstimateHours
                                        ? `${request.guesstimateHours} mhr`
                                        : ''}
                                </SubSectionText>
                            </SectionWrapper>
                        </SiblingWrapper>
                    </InnerSection>
                </FlexColumn>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>

                        <WorkflowWithLines />
                    </InnerSection>
                </FlexColumn>

                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>References</SectionHeading>

                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            documents={request.documents}
                            areas={request.areas}
                            disciplines={request.disciplines}
                            tags={request.tags}
                        />
                    </InnerSection>
                    <InnerSection>
                        <SectionHeading>Attachments</SectionHeading>
                        {request.attachments.length === 0 && (
                            <NoAttachments>No attachments has been uploaded.</NoAttachments>
                        )}
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
