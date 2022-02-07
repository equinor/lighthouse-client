import styled from 'styled-components';
import { SectionRow } from '../../../../Styles/Section';
import { useScopeChangeAccessContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Workflow } from '../../../Workflow/Workflow';
import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import { OriginLink } from '../../Components/OriginLink';
import { BoldHeading, Section, SubHeading, Value } from './RequestDetailViewStyles';
import { ChevronList } from '../ChevronList/ChevronList';

export const SplitView = (): JSX.Element => {
    const { request } = useScopeChangeAccessContext();

    return (
        <SplitScreen>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <h2>Request</h2>
                <SectionRow>
                    <Section>
                        <SubHeading>Phase</SubHeading>
                        <Value>{request.phase}</Value>
                    </Section>

                    <Section>
                        <SubHeading>State</SubHeading>
                        <Value>{request.state}</Value>
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

                <Section>
                    <BoldHeading>References</BoldHeading>
                    <Value>
                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            tags={request.tags}
                            documents={request.documents}
                        />
                    </Value>
                </Section>

                <Section>
                    <BoldHeading>Attachments</BoldHeading>
                    <Value>
                        <Attachments attachments={request.attachments} requestId={request.id} />
                    </Value>
                </Section>
            </div>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <div>
                    <h2>Workflow</h2>
                    <Workflow />
                </div>
                <Section>
                    <BoldHeading>Log</BoldHeading>
                    <Value>
                        <ChevronList title={`Log entries (${0})`}>
                            <p></p>
                        </ChevronList>
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
`;

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
