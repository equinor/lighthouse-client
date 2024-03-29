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
import { WarrantyCaseDetailCheckbox } from '../../../WarrantyCaseDetailCheckbox/WarrantyCaseDetailCheckbox';
import { GuesstimateDisciplineDetails } from '../../GuesstimateDisciplineDetails/GuesstimateDisciplineDetails';
import { OriginLink } from '../../../DetailView/OriginLink';
import { Checkbox } from '@equinor/eds-core-react-old';
import { CheckboxWrapper } from '../../../WarrantyCaseDetailCheckbox/warrantyCaseDetailCheckbox.styles';
import { RevisionsList } from './RevisionList/RevisionList';
import { AtsDetailCheckbox } from '../../../AtsScopeCheckbox/AtsCheckbox';
import { VoidedOrRevisionBanner } from './VoidedReasonBanner';
import { MarkdownViewer } from '@equinor/markdown-editor';
import DOMPurify from 'dompurify';
export function RequestTab(): JSX.Element {
  const { request, requestAccess } = useScopeChangeContext();
  const cleanDescription = DOMPurify.sanitize(request.description);
  return (
    <Wrapper>
      <VoidedOrRevisionBanner />
      <FormWrapper>
        <FlexColumn>
          <InnerSection>
            <SectionHeading>Request</SectionHeading>

            <SectionWrapper>
              <SubSectionTitle>Description</SubSectionTitle>
              <SubSectionText>
                <MarkdownViewer>{cleanDescription}</MarkdownViewer>
              </SubSectionText>
              <WarrantyCaseDetailCheckbox />
            </SectionWrapper>
            <SectionHeading>Change origin</SectionHeading>
            <SectionWrapper>
              <SubSectionTitle>Origin</SubSectionTitle>
              <SubSectionText>
                <OriginLink
                  type={request.originSource}
                  id={request.originSourceId}
                  onlyUnderlineOnHover
                />
              </SubSectionText>
            </SectionWrapper>

            <SectionHeading>Disciplines and guesstimates</SectionHeading>
            <SectionWrapper>
              <SubSectionText>
                <AtsDetailCheckbox />
                {request.disciplineGuesstimates.length > 0 && (
                  <GuesstimatesList>
                    <GuesstimateRow>
                      <SubSectionTitle>Discipline</SubSectionTitle>
                      <SubSectionTitle>Guesstimate Mhrs</SubSectionTitle>
                    </GuesstimateRow>
                    {request.disciplineGuesstimates.map(({ discipline, guesstimate, id }) => (
                      <GuesstimateDisciplineDetails
                        discipline={discipline}
                        guesstimate={guesstimate}
                        id={id}
                        key={id}
                      />
                    ))}
                  </GuesstimatesList>
                )}
              </SubSectionText>
            </SectionWrapper>
            <SectionHeading>Materials</SectionHeading>
            <SectionWrapper>
              <CheckboxWrapper>
                <Checkbox
                  crossOrigin={undefined}
                  readOnly
                  disabled
                  checked={request.materialsIdentifiedInStorage}
                />
                Materials identified in storage
              </CheckboxWrapper>
              <CheckboxWrapper>
                <Checkbox
                  readOnly
                  crossOrigin={undefined}
                  disabled
                  checked={request.materialsToBeBoughtByContractor}
                />
                Materials to be bought by contractor
              </CheckboxWrapper>
              <div>
                <SubSectionTitle>Material note</SubSectionTitle>
                <SubSectionText>{request.materialsNote}</SubSectionText>
              </div>
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
            <SectionHeading>Revisions</SectionHeading>
            <SectionWrapper>
              <RevisionsList />
            </SectionWrapper>

            <SectionHeading>References</SectionHeading>
            <SectionWrapper>
              <RelatedObjects
                punch={request?.punchListItems}
                systems={request.systems}
                commPkgs={request.commissioningPackages}
                mcPkgs={request.mcPackages}
                documents={request.documents}
                areas={request.areas}
                tags={request.tags}
              />
            </SectionWrapper>
            <SectionHeading>Attachments</SectionHeading>
            <SectionWrapper>
              {request.attachments.length === 0 && (
                <NoAttachments>No attachments have been uploaded.</NoAttachments>
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
