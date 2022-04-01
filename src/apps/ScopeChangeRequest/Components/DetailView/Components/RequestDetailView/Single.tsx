import { useIsFetching } from 'react-query';
import styled from 'styled-components';
import { CircularProgress } from '@equinor/eds-core-react';

import { SectionRow } from '../../../../Styles/Section';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Workflow } from '../../../Workflow/Components/Workflow';
import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import { OriginLink } from '../../Components/OriginLink';
import {
    BoldHeading,
    Section,
    SubHeading,
    Value,
    WorkflowLoadingHeader,
} from './RequestDetailViewStyles';
import { HistoryList } from '../History/HistoryList';
import { HotUpload } from '../../../Attachments/HotUpload';

export const SingleView = (): JSX.Element => {
    const { request, requestAccess } = useScopeChangeContext();

    const isLoading = useIsFetching({ active: true }) > 0;

    return (
        <div>
            <TitleSection>
                <BoldHeading>Request </BoldHeading>
                {isLoading && <CircularProgress size={16} />}
            </TitleSection>
            <SectionRow>
                <Section>
                    <SubHeading>Phase</SubHeading>
                    <Value>{request.phase}</Value>
                </Section>
                <Section>
                    <SubHeading>State</SubHeading>
                    <Value>{request.isVoided ? 'Voided' : request.state}</Value>
                </Section>
            </SectionRow>
            <SectionRow>
                <Section>
                    <SubHeading>Change category</SubHeading>
                    <Value>{request.changeCategory.name}</Value>
                </Section>

                <Section>
                    <SubHeading>Change origin</SubHeading>
                    <Value>
                        <OriginLink type={request.originSource} id={request.originSourceId} />
                    </Value>
                </Section>
            </SectionRow>

            <Section>
                <SubHeading>Description</SubHeading>
                <Value>{request.description}</Value>
            </Section>

            <SectionRow>
                <Section>
                    <SubHeading>Guesstimate mhrs</SubHeading>
                    <Value>{request.guesstimateHours}</Value>
                </Section>
                {request.guesstimateDescription && (
                    <Section>
                        <SubHeading>Guesstimate description</SubHeading>
                        <Value>{request.guesstimateDescription}</Value>
                    </Section>
                )}
            </SectionRow>

            <Section>
                <WorkflowLoadingHeader>
                    <BoldHeading>Workflow</BoldHeading>
                </WorkflowLoadingHeader>
                <Workflow />
            </Section>

            {(request.documents.length > 0 ||
                request.systems.length > 0 ||
                request.commissioningPackages.length > 0 ||
                request.areas.length > 0 ||
                request.disciplines.length > 0 ||
                request.tags.length > 0) && (
                    <Section>
                        <WorkflowLoadingHeader>
                            <BoldHeading>References</BoldHeading>
                        </WorkflowLoadingHeader>
                        <Value>
                            <RelatedObjects
                                systems={request.systems}
                                commPkgs={request.commissioningPackages}
                                documents={request.documents}
                                areas={request.areas}
                                disciplines={request.disciplines}
                                tags={request.tags}
                            />
                        </Value>
                    </Section>
                )}

            <Section>
                <BoldHeading>Attachments</BoldHeading>
                <Value>
                    {requestAccess.canPatch && <HotUpload />}
                    <Attachments attachments={request.attachments} requestId={request.id} />
                </Value>
            </Section>

            <Section style={{ paddingBottom: '1em' }}>
                <BoldHeading>Log</BoldHeading>
                <Value>
                    <HistoryList />
                </Value>
            </Section>
        </div>
    );
};

const TitleSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1em;
`;
