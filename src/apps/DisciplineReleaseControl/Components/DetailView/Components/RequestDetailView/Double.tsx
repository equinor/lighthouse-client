import styled from 'styled-components';
import { Workflow } from '../../../Workflow/Components/Workflow';
import { RelatedObjects } from '../../Components/RelatedObjects';
import {
    BoldHeading,
    Section,
    SubHeading,
    Value,
    WorkflowLoadingHeader,
} from './RequestDetailViewStyles';
import { HistoryList } from '../History/HistoryList';
import { useApiActionObserver } from '../../../../Hooks/useApiActionObserver';
import { Progress } from '@equinor/eds-core-react';
import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';

export const SplitView = (): JSX.Element => {
    const { process } = useReleaseControlContext();

    const isBusy = useApiActionObserver();

    return (
        <SplitScreen>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <BoldHeading>Discipline release control process</BoldHeading>

                <Section>
                    <SubHeading>Description</SubHeading>
                    <Value>{process.description}</Value>
                </Section>

                {(process.documents.length > 0 ||
                    process.systems.length > 0 ||
                    process.commissioningPackages.length > 0 ||
                    process.areas.length > 0 ||
                    process.disciplines.length > 0 ||
                    process.tags.length > 0) && (
                    <Section>
                        <BoldHeading>References</BoldHeading>
                        <Value>
                            <RelatedObjects
                                systems={process.systems}
                                commPkgs={process.commissioningPackages}
                                documents={process.documents}
                                areas={process.areas}
                                disciplines={process.disciplines}
                                tags={process.tags}
                            />
                        </Value>
                    </Section>
                )}

                {/* <Section>
                    <BoldHeading>Attachments</BoldHeading>
                    <Value>
                        <Attachments attachments={process.attachments} processId={process.id} />
                    </Value>
                </Section> */}
            </div>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <Section>
                    <WorkflowLoadingHeader>
                        <BoldHeading>Workflow</BoldHeading>
                        {isBusy && <Progress.Dots color="primary" />}
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
`;
