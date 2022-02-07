import styled from 'styled-components';
import { Field } from '../Field';
import { SectionRow } from '../../../../Styles/Section';
import { useScopeChangeAccessContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Workflow } from '../../../Workflow/Workflow';
import { StidDocumentResolver } from '../../Components/StidDocumentResolver';
import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import { OriginLink } from '../../Components/OriginLink';
import { ChevronList } from '../ChevronList/ChevronList';

export const SingleView = (): JSX.Element => {
    const { request } = useScopeChangeAccessContext();

    return (
        <SplitScreen>
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

            <Field
                customLabel={{ fontSize: '18px', bold: true }}
                label="Documents"
                value={<StidDocumentResolver inputDocuments={request.documents} />}
            />
        </SplitScreen>
    );
};

const SplitScreen = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

const SubHeading = styled.div`
    font-size: 12px;
`;

const Value = styled.div`
    margin-top: 0.5em;
    font-size: 16px;
`;

const BoldHeading = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 0.5em;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    margin-right: 2em;
`;

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
