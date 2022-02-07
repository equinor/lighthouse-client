import { SectionRow } from '../../../../Styles/Section';
import { useScopeChangeAccessContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Workflow } from '../../../Workflow/Components/Workflow';
import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import { OriginLink } from '../../Components/OriginLink';
import { ChevronList } from '../ChevronList/ChevronList';
import { BoldHeading, Section, SubHeading, Value } from './RequestDetailViewStyles';

export const SingleView = (): JSX.Element => {
    const { request } = useScopeChangeAccessContext();

    return (
        <div>
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
                <BoldHeading>Workflow</BoldHeading>
                <Workflow />
            </Section>

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

            <Section>
                <BoldHeading>Log</BoldHeading>
                <Value>
                    <ChevronList title={`Log entries (${0})`}>
                        <p></p>
                    </ChevronList>
                </Value>
            </Section>
        </div>
    );
};

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
