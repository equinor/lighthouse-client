import styled from 'styled-components';
import { SectionRow } from '../../../../Styles/Section';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Workflow } from '../../../Workflow/Components/Workflow';
import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import { OriginLink } from '../../Components/OriginLink';
import { BoldHeading, Section, SubHeading, Value } from './RequestDetailViewStyles';
import { HistoryList } from '../History/HistoryList';

export const SplitView = (): JSX.Element => {
    const { request } = useScopeChangeContext();

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

                <Section>
                    <BoldHeading>References</BoldHeading>
                    <Value>
                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            tags={request.tags}
                            documents={request.documents}
                            areas={request.areas}
                            disciplines={request.disciplines}
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
                    <BoldHeading>Workflow</BoldHeading>
                    <Workflow />
                </div>
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
`;
