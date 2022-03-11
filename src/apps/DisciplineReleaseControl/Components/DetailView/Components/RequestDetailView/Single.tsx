import { SectionRow } from '../../../../Styles/Section';
import { Workflow } from '../../../Workflow/Components/Workflow';
// import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import {
    BoldHeading,
    Section,
    SubHeading,
    Value,
    WorkflowLoadingHeader,
} from './RequestDetailViewStyles';
import { HistoryList } from '../History/HistoryList';
// import { HotUpload } from '../../../Attachments/HotUpload';
import { Progress } from '@equinor/eds-core-react';
import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';
import { useApiActionObserver } from '../../../../Hooks/useApiActionObserver';
import { ElectroView } from '../../../Electro/ElectroView';
import { pipetestData } from '../../../../pipetestData';
import { Pipetest } from '../../../../Types/Pipetest';

export const SingleView = (): JSX.Element => {
    const { process } = useReleaseControlContext();
    const isBusy = useApiActionObserver();

    return (
        <div>
            <h2>Discipline release control process</h2>
            <SectionRow>
                <Section>
                    <SubHeading>Description</SubHeading>
                    <Value>{process.description}</Value>
                </Section>
            </SectionRow>

            <Section>
                <WorkflowLoadingHeader>
                    <BoldHeading>Workflow</BoldHeading>
                    {isBusy && <Progress.Dots color="primary" />}
                </WorkflowLoadingHeader>
                <Workflow />
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
                    {requestAccess.canPatch && <HotUpload />}
                    <Attachments attachments={process.attachments} processId={process.id} />
                </Value>
            </Section> */}
            <Section>
                <BoldHeading>Log</BoldHeading>
                <Value>
                    <HistoryList />
                </Value>
            </Section>
            <Section>
                <ElectroView pipetest={pipetestData[1] as unknown as Pipetest} />
            </Section>
        </div>
    );
};
