import { Column, Table } from '@equinor/Table';
import { WorkOrder } from '../../Types/workOrder';
import { EstimateBar } from '../WoProgressBars/EstimateBar';
import { ExpendedProgressBar } from '../WoProgressBars/ExpendedProgressBar';
import { ProgressBar } from '../WoProgressBars/ProgressBar';
import { generateColumn, highestEstimate, highestExpended } from './workOrderHelpers';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    const someColumns: Column<any>[] = [
        generateColumn('WO', ({ workOrderNo }) => workOrderNo, 170),
        generateColumn('Title', ({ title }) => title, 310),
        generateColumn('Discipline', ({ discipline }) => discipline, 80),
        generateColumn('Status', ({ jobStatus }) => jobStatus, 80),
        generateColumn(
            'Plan. finish',
            ({ plannedCompletionDate }) =>
                plannedCompletionDate === null
                    ? 'No date'
                    : new Date(plannedCompletionDate).toLocaleDateString('EN-GB'),
            100
        ),
        generateColumn(
            'Act. finish',
            ({ actualCompletionDate }) =>
                actualCompletionDate === null
                    ? ''
                    : new Date(actualCompletionDate).toLocaleDateString('EN-GB'),
            100
        ),
        generateColumn(
            'Progress',
            ({ projectProgress }) => <ProgressBar percentWidth={parseInt(projectProgress)} />,
            100
        ),
        generateColumn(
            'Estimated',
            ({ estimatedManHours }) => (
                <EstimateBar
                    current={parseInt(estimatedManHours)}
                    max={highestEstimate(workOrders)}
                />
            ),
            100
        ),
        generateColumn(
            'Expended',
            ({ expendedManHours, estimatedManHours }) => (
                <ExpendedProgressBar
                    actual={Number(expendedManHours) ?? 0}
                    estimate={parseInt(estimatedManHours)}
                    highestExpended={highestExpended(workOrders)}
                />
            ),
            100
        ),
    ];

    return (
        <div>{workOrders && <Table options={{ data: workOrders, columns: someColumns }} />}</div>
    );
}
