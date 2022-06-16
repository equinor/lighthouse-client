import { tokens } from '@equinor/eds-tokens';
import { EstimateBar, ExpendedProgressBar, ProgressBar, Table } from '@equinor/Table';
import styled from 'styled-components';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { WorkOrder } from '../../types/FAM/workOrder';
import { generateColumn } from './Utils/generateColumn';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    const highestEstimate = Math.max(
        ...workOrders.map(({ estimatedHours }) => estimatedHours ?? 0)
    );
    const highestExpended = Math.max(
        ...workOrders.map(({ expendedHours }) => Number(expendedHours) ?? 0)
    );

    return (
        <div>
            {workOrders && (
                <Table columns={makeColumns(highestExpended, highestEstimate)} data={workOrders} />
            )}
        </div>
    );
}

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
        hideUnderline ? 'none' : 'underline'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const makeColumns = (highestExpended: number, highestEstimate: number) => [
    generateColumn(
        'WO',
        ({ workOrderNumber, workOrderId }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(proCoSysUrls.getWorkOrderUrl(workOrderId), '_blank');
                }}
            >
                {workOrderNumber}
            </Link>
        ),
        90
    ),
    generateColumn('Title', ({ description }) => description, 310),
    generateColumn('Discipline', ({ disciplineCode }) => disciplineCode, 80),
    generateColumn('Status', ({ jobStatus }) => jobStatus, 80),
    generateColumn(
        'Plan. finish',
        ({ plannedFinishDate }) =>
            plannedFinishDate ? new Date(plannedFinishDate).toLocaleDateString('EN-GB') : '',
        100
    ),
    generateColumn(
        'Act. finish',
        ({ actualCompletionDate }) =>
            actualCompletionDate ? new Date(actualCompletionDate).toLocaleDateString('EN-GB') : '',
        100
    ),
    generateColumn(
        'Progress',
        ({ projectProgress }) => <ProgressBar percentWidth={projectProgress ?? 0} />,
        100
    ),
    generateColumn(
        'Estimated',
        ({ estimatedHours }) => <EstimateBar current={estimatedHours ?? 0} max={highestEstimate} />,
        100
    ),
    generateColumn(
        'Expended',
        ({ expendedHours, estimatedHours }) => (
            <ExpendedProgressBar
                actual={Number(expendedHours) ?? 0}
                estimate={estimatedHours ?? 0}
                highestExpended={highestExpended}
            />
        ),
        100
    ),
];
