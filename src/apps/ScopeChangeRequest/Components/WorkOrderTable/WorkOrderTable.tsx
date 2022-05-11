import { tokens } from '@equinor/eds-tokens';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { Table } from '@equinor/Table';
import styled from 'styled-components';
import { WorkOrder } from '../../types/FAM/workOrder';
import { EstimateBar } from '../WoProgressBars/EstimateBar';
import { ExpendedProgressBar } from '../WoProgressBars/ExpendedProgressBar';
import { ProgressBar } from '../WoProgressBars/ProgressBar';
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
    generateColumn(
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
    generateColumn('Title', ({ description }) => description, 310),
    generateColumn('Discipline', ({ disciplineCode }) => disciplineCode, 80),
    generateColumn('Status', ({ jobStatus }) => jobStatus, 80),
    generateColumn(
        'Plan. finish',
        ({ plannedFinishDate }) => new Date(plannedFinishDate).toLocaleDateString('EN-GB'),
        100
    ),
    generateColumn(
        'Act. finish',
        ({ actualCompletionDate }) => new Date(actualCompletionDate).toLocaleDateString('EN-GB'),
        100
    ),
    generateColumn(
        'Progress',
        ({ projectProgress }) => <ProgressBar percentWidth={projectProgress} />,
        100
    ),
    generateColumn(
        'Estimated',
        ({ estimatedHours }) => <EstimateBar current={estimatedHours} max={highestEstimate} />,
        100
    ),
    generateColumn(
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
