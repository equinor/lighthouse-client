import styled from 'styled-components';
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
import { Progress } from '@equinor/eds-core-react';
import { HotUpload } from '../../../Attachments/HotUpload';
import { useScopechangeQueryKeyGen } from '../../../../Hooks/React-Query/useScopechangeQueryKeyGen';
import { useScopechangeMutationKeyGen } from '../../../../Hooks/React-Query/useScopechangeMutationKeyGen';
import { useIsFetching, useIsMutating } from 'react-query';

export const SplitView = (): JSX.Element => {
    const { request, requestAccess } = useScopeChangeContext();

    const { workflowKeys: workflowMutationKeys } = useScopechangeMutationKeyGen(request.id);
    const { workflowKeys } = useScopechangeQueryKeyGen(request.id);

    const workflowFetching = useIsFetching(workflowKeys.baseKey);
    const workflowMutating = useIsMutating(workflowMutationKeys.baseKey);

    return (
        <SplitScreen>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <BoldHeading>Request</BoldHeading>
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
                        <Value>{request.category}</Value>
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
                    <Section>
                        <SubHeading>Guesstimate description</SubHeading>
                        <Value>{request.guesstimateDescription}</Value>
                    </Section>
                </SectionRow>

                {(request.documents.length > 0 ||
                    request.systems.length > 0 ||
                    request.commissioningPackages.length > 0 ||
                    request.areas.length > 0 ||
                    request.disciplines.length > 0 ||
                    request.tags.length > 0) && (
                    <Section>
                        <BoldHeading>References</BoldHeading>
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
            </div>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <Section>
                    <WorkflowLoadingHeader>
                        <BoldHeading>Workflow</BoldHeading>
                        {(workflowFetching > 0 || workflowMutating > 0) && (
                            <Progress.Dots color="primary" />
                        )}
                    </WorkflowLoadingHeader>
                    <Workflow />
                </Section>
                <Section>
                    <BoldHeading>Log</BoldHeading>
                    <Value>
                        <HistoryList />
                    </Value>
                </Section>
            </div>
        </SplitScreen>
    );
};

const SplitScreen = styled.div`
    display: flex;
    flex-direction: row;
    flex-basis: 0;
    overflow: scroll;
    padding: 2em 0em;
    gap: 1em;
`;
