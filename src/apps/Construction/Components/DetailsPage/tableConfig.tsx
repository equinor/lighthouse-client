import { CellProps, Column, TableInstance } from '@equinor/Table';
import { WorkOrder } from '../../Types';
import {
    SumColumnFooter,
    SumColumnFooterCount,
    SumColumnFooterCountTotal,
    SumColumnFooterSum,
} from './components';

export const cols: Column<WorkOrder>[] = [
    {
        Header: '',
        accessor: 'discipline',
        Footer: () => <></>,
        columns: [
            {
                Header: 'Discipline',
                accessor: 'discipline',
                width: 250,
                maxWidth: 300,
                Footer: (data) => <SumColumnFooter data={data} columnId={'discipline'} />,
            },
        ],
    },
    {
        Header: 'W01',
        Footer: () => <></>,
        // accessor: "jobStatus",
        columns: [
            {
                id: 'W01-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (row) => row.sourceIdentity,
                aggregate: 'count',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W01' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W01'}
                        columnId={'W01-WOs'}
                    />
                ),
            },
            {
                id: 'W01-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (row) => row.estimatedManHours,
                aggregate: 'sum',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W01'
                                ? acc + Number(i.original.estimatedManHours) || 0
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W01'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'W02',
        Footer: () => <></>,
        columns: [
            {
                id: 'W02-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W02' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W02'}
                        columnId={'W02-WOs'}
                    />
                ),
            },
            {
                id: 'W02-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours) || 0;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W02'
                                ? acc + Number(i.original.estimatedManHours) || 0
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W02'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'W03',
        Footer: () => <></>,
        columns: [
            {
                id: 'W03-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                aggregate: 'count',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W03' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W03'}
                        columnId={'W03-WOs'}
                    />
                ),
            },
            {
                id: 'W03-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours) || 0;
                },
                aggregate: 'sum',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W03'
                                ? acc + Number(i.original.estimatedManHours) || 0
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W03'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'W04',
        Footer: () => <></>,
        columns: [
            {
                id: 'W04-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W04' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W04'}
                        columnId={'W04-WOs'}
                    />
                ),
            },
            {
                id: 'W04-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours) || 0;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W04'
                                ? acc + Number(i.original.estimatedManHours) || 0
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W04'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },

    {
        Header: 'W05',
        Footer: () => <></>,
        columns: [
            {
                id: 'W05-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W05' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W05'}
                        columnId={'W05-WOs'}
                    />
                ),
            },
            {
                id: 'W05-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours);
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W05'
                                ? acc + Number(i.original.estimatedManHours)
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W05'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'W06',
        Footer: () => <></>,
        columns: [
            {
                id: 'W06-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W06' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W06'}
                        columnId={'W06-WOs'}
                    />
                ),
            },
            {
                id: 'W06-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours);
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W06'
                                ? acc + Number(i.original.estimatedManHours)
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W06'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'W07',
        Footer: () => <></>,
        columns: [
            {
                id: 'W07-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W07' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W07'}
                        columnId={'W07-WOs'}
                    />
                ),
            },
            {
                id: 'W07-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours);
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W07'
                                ? acc + Number(i.original.estimatedManHours)
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W07'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'W08',
        Footer: () => <></>,
        columns: [
            {
                id: 'W08-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.sourceIdentity;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'W08' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W08'}
                        columnId={'W08-WOs'}
                    />
                ),
            },
            {
                id: 'W08-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours);
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'W08'
                                ? acc + Number(i.original.estimatedManHours)
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'W08'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'Total',
        Footer: () => <></>,
        columns: [
            {
                id: 'Total-WOs',
                Header: 'WOs',
                width: 100,
                accessor: (item: WorkOrder): string => {
                    return item.responsible;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>): JSX.Element => {
                    return <SumColumnFooter data={data} columnId={'Total-WOs'} />;
                },
            },
            {
                id: 'Total-Est',
                Header: 'Est mhrs',
                width: 100,
                accessor: (item: WorkOrder): number => {
                    return Number(item.estimatedManHours) || 0;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = acc + Number(i.original.estimatedManHours) || 0;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCountTotal data={data} fieldKey={'estimatedManHours'} />
                ),
            },
        ],
    },
];
