import { proCoSysUrls } from '@equinor/procosys-urls';
import { EstimateBar, ExpendedProgressBar, ProgressBar } from '@equinor/Table';
import { WorkOrder } from '@equinor/Workflow';
import { Columns, Column, Header, Link } from './compactWorkOrder.styles';

interface CompactWorkorderProps {
    wo: WorkOrder;
    highestEstimate: number;
    highestExpended: number;
}

export const CompactWorkorder = ({
    wo,
    highestEstimate,
    highestExpended,
}: CompactWorkorderProps): JSX.Element => {
    const {
        workOrderNumber,
        workOrderUrlId,
        description,
        disciplineCode,
        jobStatus,
        plannedFinishDate,
        actualCompletionDate,
        projectProgress,
        estimatedHours,
        expendedHours,
    } = wo;

    return (
        <div style={{ height: '72px' }}>
            <Header>
                <Link
                    onClick={() =>
                        window.open(proCoSysUrls.getWorkOrderUrl(workOrderUrlId ?? ''), '_blank')
                    }
                >
                    {workOrderNumber}
                </Link>
                , {description}
            </Header>

            <Columns>
                <Column>
                    <div>Disc.</div>
                    <div>{disciplineCode}</div>
                </Column>
                <Column>
                    <div>Status</div>
                    <div>{jobStatus}</div>
                </Column>
                <Column>
                    <div>Plan. finish.</div>
                    <div>
                        {plannedFinishDate
                            ? new Date(plannedFinishDate).toLocaleDateString('EN-GB')
                            : ''}
                    </div>
                </Column>
                <Column>
                    <div>Act. finish.</div>
                    <div>
                        {actualCompletionDate &&
                            new Date(actualCompletionDate).toLocaleDateString('EN-GB')}
                    </div>
                </Column>
                <Column>
                    <div>Progress</div>
                    <ProgressBar percentWidth={projectProgress ?? 0} />
                </Column>
                <Column>
                    <div>Estimate</div>
                    <EstimateBar current={estimatedHours ?? 0} max={highestEstimate} />
                </Column>
                <Column>
                    <div>Expended</div>
                    <div>
                        <ExpendedProgressBar
                            actual={Number(expendedHours) ?? 0}
                            estimate={estimatedHours ?? 0}
                            highestExpended={highestExpended}
                        />
                    </div>
                </Column>
            </Columns>
        </div>
    );
};
