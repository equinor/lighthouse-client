import { Atom, deref, swap } from '@dbeining/react-atom';
import { tokens } from '@equinor/eds-tokens';
import {
    CellProps,
    CustomLinkCellWithTextDecoration,
    CustomProgressCell,
    CustomYearAndWeekCell,
    EstimateBar,
    ExpendedProgressBar,
    StatusCustomCell,
} from '@equinor/Table';
import { TableOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { proCoSysUrls } from '../../../packages/ProCoSysUrls/procosysUrl';
import { WorkOrder } from '../Garden/models';
import { getMatStatusColorByStatus, getMccrStatusColorByStatus } from '../Garden/utility';
const remainingHoursMaxAtom = Atom.of<number>(-1);
const estimateHoursMaxAtom = Atom.of<number>(-1);
const actualHoursMaxAtom = Atom.of<number>(-1);

export const tableConfig: TableOptions<WorkOrder> = {
    objectIdentifierKey: 'workOrderNumber',
    preventAutoGenerateColumns: true,
    itemSize: 32,
    customColumns: [
        {
            id: 'workOrderNumber',
            Header: 'Workorder',
            accessor: (pkg) => ({
                content: pkg,
                currentKey: 'workOrderNumber',
                url: proCoSysUrls.getWorkOrderUrl(pkg.workOrderId || ''),
            }),
            Cell: (cellProps) => {
                return (
                    <CustomLinkCellWithTextDecoration
                        contentToBeDisplayed={cellProps.value.content.workOrderNumber}
                        url={cellProps.value.url}
                    />
                );
            },
            Aggregated: () => null,
            aggregate: 'count',
            width: 200,
        },
        {
            id: 'description',
            Header: 'Description',
            accessor: (pkg) => pkg.description,
            Aggregated: () => null,
            aggregate: 'count',
            Cell: (cellProps) => (
                <div
                    style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    title={cellProps.value}
                >
                    {cellProps.value}
                </div>
            ),
            width: 300,
        },
        {
            id: 'disciplineCode',
            Header: 'Discipline',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.disciplineCode,
            width: 100,
        },
        {
            id: 'responsibleCode',
            Header: 'Responsible',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.responsibleCode,
            width: 100,
        },
        {
            id: 'milestone',
            Header: 'Milestone',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.milestone,
            width: 150,
        },
        {
            id: 'jobStatus',
            Header: 'Job status',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.jobStatus,
            width: 150,
        },
        {
            id: 'materialStatus',
            Header: 'Material',
            accessor: (pkg) => pkg.materialStatus,
            Aggregated: () => null,
            aggregate: 'count',
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value) return null;
                const statusColor = getMatStatusColorByStatus(cellProps.value);
                return (
                    <StatusCustomCell
                        contentToBeDisplayed={cellProps.value}
                        cellAttributeFunction={() => ({
                            style: {
                                backgroundColor:
                                    cellProps.value !== '' ? statusColor : 'transparent',
                            },
                        })}
                    />
                );
            },
            width: 100,
        },
        {
            id: 'holdBy',
            Header: 'Hold',
            accessor: (pkg) => pkg.holdBy,
            Aggregated: () => null,
            aggregate: 'count',
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value) return null;

                return (
                    <StatusCustomCell
                        contentToBeDisplayed={cellProps.value}
                        cellAttributeFunction={() => ({
                            style: {
                                backgroundColor: cellProps.value
                                    ? tokens.colors.interactive.danger__resting.hsla
                                    : 'transparent',
                            },
                        })}
                    />
                );
            },
            width: 100,
        },

        {
            id: 'plannedStartupDate',
            Header: 'Planned start',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.plannedStartupDate,
            Cell: (cellProps) => <CustomYearAndWeekCell dateString={cellProps.value} />,
            width: 150,
        },
        {
            id: 'plannedFinishDate',
            Header: 'Planned finish',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.plannedFinishDate,
            Cell: (cellProps) => <CustomYearAndWeekCell dateString={cellProps.value} />,
            width: 150,
        },
        {
            id: 'estimatedHours',
            Header: 'Est mhr',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.estimatedHours,
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value) {
                    return null;
                }
                if (deref(estimateHoursMaxAtom) === -1) {
                    const maxCount = Math.max(
                        ...cellProps.cell.column.filteredRows.map((val) =>
                            Number(val.original?.estimatedHours)
                        )
                    );
                    swap(estimateHoursMaxAtom, () => maxCount);
                }

                const highestEstimatedHours = deref(estimateHoursMaxAtom);

                return (
                    <EstimateBar current={Number(cellProps.value)} max={highestEstimatedHours} />
                );
            },
            width: 100,
        },
        {
            id: 'expendedHours',
            Header: 'Exp mhr',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => ({ content: pkg, currentKey: 'expendedHours' }),
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value) {
                    return null;
                }
                if (deref(actualHoursMaxAtom) === -1) {
                    const maxCount = Math.max(
                        ...cellProps.cell.column.filteredRows.map((val) =>
                            Number(val.original?.expendedHours)
                        )
                    );
                    swap(actualHoursMaxAtom, () => maxCount);
                }

                const highestExpendedHours = deref(actualHoursMaxAtom);

                return (
                    <ExpendedProgressBar
                        actual={Number(cellProps.value.content.expendedHours)}
                        estimate={Number(cellProps.value.content.estimatedHours)}
                        highestExpended={highestExpendedHours}
                    />
                );
            },
            width: 100,
        },
        {
            id: 'remaningHours',
            Header: 'Rem mhr',
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (pkg) => pkg.remainingHours,
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value) {
                    return null;
                }
                if (deref(remainingHoursMaxAtom) === -1) {
                    const maxCount = Math.max(
                        ...cellProps.cell.column.filteredRows.map((val) =>
                            Number(val.original?.remainingHours)
                        )
                    );
                    swap(remainingHoursMaxAtom, () => maxCount);
                }

                const highestRemaining = deref(remainingHoursMaxAtom);

                return <EstimateBar current={Number(cellProps.value)} max={highestRemaining} />;
            },
            width: 100,
        },
        {
            id: 'projectProgress',
            Header: 'Progress',
            accessor: (pkg) => pkg.projectProgress,
            Aggregated: () => null,
            aggregate: 'count',
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value || Number(cellProps.value) === 0) {
                    return null;
                }

                return <CustomProgressCell progress={cellProps.value} />;
            },
            width: 100,
        },

        {
            id: 'mccrStatus',
            Header: 'MC',
            accessor: (pkg) => pkg.mccrStatus,
            Aggregated: () => null,
            aggregate: 'count',
            Cell: (cellProps: CellProps<WorkOrder>) => {
                if (!cellProps.value) return null;
                const statusColor = getMccrStatusColorByStatus(cellProps.value);
                return (
                    <StatusCustomCell
                        contentToBeDisplayed={cellProps.value}
                        cellAttributeFunction={() => ({
                            style: {
                                backgroundColor:
                                    cellProps.value !== '' ? statusColor : 'transparent',
                            },
                        })}
                    />
                );
            },
            width: 100,
        },
    ],
};
