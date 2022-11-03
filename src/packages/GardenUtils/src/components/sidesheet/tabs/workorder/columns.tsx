import {
    CellProps,
    Column,
    CustomDateCell,
    CustomDescriptionCell,
    EstimateBar,
    ProgressBar,
} from '@equinor/Table';
import { CellWithLink } from '../../../cells/CellWithLink';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { WorkOrderBase } from './types';

export const columns = (): Column<WorkOrderBase>[] => {
    let estimateHoursMax = -1;
    let remainingHoursMax = -1;
    return [
        {
            id: 'workOrderNo',
            Header: 'WO',
            accessor: (pkg) => ({
                content: pkg,
                url: proCoSysUrls.getWorkOrderUrl(pkg.workOrderId),
                currentKey: 'workOrderNo',
            }),
            Cell: CellWithLink,
            width: 130,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'title',
            Header: 'Title',
            accessor: (wo) => wo.title,
            Cell: (cellProps: CellProps<WorkOrderBase, string | null>): JSX.Element => {
                return <CustomDescriptionCell description={cellProps.value} />;
            },
            width: 300,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'discipline',
            Header: 'Discipline',
            accessor: (wo) => wo.discipline,
            width: 80,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'status',
            Header: 'Status',
            accessor: (wo) => wo.jobStatus,
            width: 80,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'plannedCompletionDate',
            Header: 'Plan. finish',
            accessor: (wo) => wo.plannedCompletionDate,
            Cell: (cellProps: CellProps<WorkOrderBase, string | null>): JSX.Element => {
                return <CustomDateCell dateString={cellProps.value} />;
            },
            width: 100,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'actualCompletionDate',
            Header: 'Act. finish',
            accessor: (wo) => wo.actualCompletionDate,
            Cell: (cellProps: CellProps<WorkOrderBase, string | null>): JSX.Element => {
                return <CustomDateCell dateString={cellProps.value} />;
            },
            width: 100,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'projectProgress',
            Header: 'Progress',
            accessor: (wo) => wo.projectProgress,
            Cell: (cellProps: CellProps<WorkOrderBase, number | null>): JSX.Element | null => {
                return (
                    <ProgressBar percentWidth={cellProps.value === null ? 0 : cellProps.value} />
                );
            },
            width: 100,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'estimatedManHours',
            accessor: (wo) => wo.estimatedManHours,
            Header: 'Estimated',
            width: 100,
            Cell: (cellProps: CellProps<WorkOrderBase, number | null>): JSX.Element | null => {
                if (estimateHoursMax === -1) {
                    const maxCount = Math.max(
                        ...cellProps.cell.column.filteredRows.map((val) =>
                            Number(
                                val.original?.estimatedManHours === null
                                    ? 0
                                    : val.original?.estimatedManHours
                            )
                        )
                    );
                    estimateHoursMax = maxCount;
                }
                return (
                    <EstimateBar
                        current={Number(cellProps.value === null ? 0 : cellProps.value)}
                        max={estimateHoursMax}
                    />
                );
            },
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'remainingManHours',
            accessor: (wo) => wo.remainingManHours,
            Header: 'Remaining',
            width: 100,

            Cell: (cellProps: CellProps<WorkOrderBase, number | null>): JSX.Element => {
                if (remainingHoursMax === -1) {
                    const maxCount = Math.max(
                        ...cellProps.cell.column.filteredRows.map((val) =>
                            Number(
                                val.original?.remainingManHours === null
                                    ? 0
                                    : val.original?.remainingManHours
                            )
                        )
                    );
                    remainingHoursMax = maxCount;
                }
                return (
                    <EstimateBar
                        current={Number(cellProps.value === null ? 0 : cellProps.value)}
                        max={remainingHoursMax}
                    />
                );
            },
            Aggregated: () => null,
            aggregate: 'count',
        },
    ];
};
