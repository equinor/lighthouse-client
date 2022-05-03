import { Column, Table } from '@equinor/Table';
import { WorkOrder } from '../../Types/workOrder';
import { EstimateBar } from '../WoProgressBars/EstimateBar';
import { ExpendedProgressBar } from '../WoProgressBars/ExpendedProgressBar';
import { ProgressBar } from '../WoProgressBars/ProgressBar';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    const highestEstimate = Math.max(
        ...workOrders.map(({ estimatedManHours }) => parseInt(estimatedManHours))
    );
    const highestExpended = Math.max(
        ...workOrders.map(({ expendedManHours }) => Number(expendedManHours) ?? 0)
    );

    function generateColumn(
        headerName: string,
        render: (wo: WorkOrder) => string | number | JSX.Element | Date | null | undefined,
        width: number
    ): Column<any> {
        return {
            Header: headerName,
            accessor: headerName,
            width: width,
            Cell: ({ cell }: any) => {
                return render(cell.row.original);
            },
        };
    }

    const someColumns: Column<any>[] = [
        generateColumn('WO', ({ workOrderNo }) => workOrderNo, 170),
        generateColumn('Title', ({ description }) => description, 310),
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
                    ? 'No date'
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
                <EstimateBar current={parseInt(estimatedManHours)} max={highestEstimate} />
            ),
            100
        ),
        generateColumn(
            'Expended',
            ({ expendedManHours, estimatedManHours }) => (
                <ExpendedProgressBar
                    actual={Number(expendedManHours) ?? 0}
                    estimate={parseInt(estimatedManHours)}
                    highestExpended={highestExpended}
                />
            ),
            100
        ),
    ];

    return (
        <div>{workOrders && <Table options={{ data: workOrders, columns: someColumns }} />}</div>
    );
}
