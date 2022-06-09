import { tokens } from '@equinor/eds-tokens';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { EstimateBar, ExpendedProgressBar, ProgressBar, Table } from '@equinor/Table';
import styled from 'styled-components';
import { WorkOrder } from '../../types/FAM/workOrder';
import { generateColumn } from './Utils/generateColumn';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    const highestEstimate = Math.max(...workOrders.map(({ estimatedHours }) => estimatedHours));
    const highestExpended = Math.max(
        ...workOrders.map(({ expendedHours }) => Number(expendedHours) ?? 0)
    );

    const { title } = useFacility();

    return (
        <div>
            {workOrders && (
                <Table
                    options={{
                        data: workOrders,
                        columns: makeColumns(highestExpended, highestEstimate, title),
                    }}
                />
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

const makeColumns = (highestExpended: number, highestEstimate: number, title: string) => [
    generateColumn<WorkOrder>(
        'WO',
        ({ workOrderNumber, workOrderId }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(
                        //TODO:
                        `https://procosys.equinor.com/${title.replace(
                            ' ',
                            '_'
                        )}/WorkOrders/WorkOrder#id=${workOrderId}`,
                        '_blank'
                    );
                }}
            >
                {workOrderNumber}
            </Link>
        ),
        90
    ),
    generateColumn<WorkOrder>('Title', ({ description }) => description, 310),
    generateColumn<WorkOrder>('Discipline', ({ disciplineCode }) => disciplineCode, 80),
    generateColumn<WorkOrder>('Status', ({ jobStatus }) => jobStatus, 80),
    generateColumn<WorkOrder>(
        'Plan. finish',
        ({ plannedFinishDate }) => new Date(plannedFinishDate).toLocaleDateString('EN-GB'),
        100
    ),
    generateColumn<WorkOrder>(
        'Act. finish',
        ({ actualCompletionDate }) => new Date(actualCompletionDate).toLocaleDateString('EN-GB'),
        100
    ),
    generateColumn<WorkOrder>(
        'Progress',
        ({ projectProgress }) => <ProgressBar percentWidth={projectProgress} />,
        100
    ),
    generateColumn<WorkOrder>(
        'Estimated',
        ({ estimatedHours }) => <EstimateBar current={estimatedHours} max={highestEstimate} />,
        100
    ),
    generateColumn<WorkOrder>(
        'Expended',
        ({ expendedHours, estimatedHours }) => (
            <ExpendedProgressBar
                actual={Number(expendedHours) ?? 0}
                estimate={estimatedHours}
                highestExpended={highestExpended}
            />
        ),
        100
    ),
];
