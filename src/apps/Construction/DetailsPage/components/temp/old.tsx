import { Column } from '@equinor/Table';
import { useMemo } from 'react';
import { CellProps, TableInstance } from 'react-table';
import { WorkOrder } from '../../../mocData/mockData';

type FooterProps<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    columnId: string;
};

const SumColumnFooter = ({ data, columnId }: FooterProps<WorkOrder>): JSX.Element => {
    const total = useMemo(
        () =>
            data.rows.reduce((sum, row) => {
                return row.values[columnId] + sum;
            }, 0),
        [data.rows, columnId]
    );

    return (data.state as any)?.groupBy?.includes(columnId) ? (
        <div>Total: </div>
    ) : (
        <div> {total}</div>
    );
};

type FooterPropsCount<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
    value: string;
    columnId: string;
};

const SumColumnFooterCount = ({
    data,
    fieldKey,
    value,
}: FooterPropsCount<WorkOrder>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + 1 : sum;
            }, 0),
        [data.data, fieldKey, value]
    );

    return <div>{total}</div>;
};

type FooterPropsCountTotal<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
};

const SumColumnFooterCountTotal = ({
    data,
    fieldKey,
}: FooterPropsCountTotal<WorkOrder>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return sum + Number(row[fieldKey]);
            }, 0),
        [data.data, fieldKey]
    );

    return <div>{total}</div>;
};

type FooterPropsSum<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
    sumKey: keyof T;
    value: string;
};

const SumColumnFooterSum = ({
    data,
    fieldKey,
    value,
    sumKey,
}: FooterPropsSum<WorkOrder>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + Number(row[sumKey]) : sum;
            }, 0),
        [data.data, fieldKey, sumKey, value]
    );

    return <div> {total}</div>;
};

export const tableColumns: Column<WorkOrder>[] = [
    {
        Header: '',
        accessor: 'disciplineDescription',
        Footer: () => <></>,
        columns: [
            {
                Header: 'Discipline',
                accessor: 'disciplineDescription',
                width: 250,
                maxWidth: 300,
                Footer: (data) => (
                    <SumColumnFooter data={data} columnId={'disciplineDescription'} />
                ),
            },
        ],
    },
    {
        Header: 'E10',
        Footer: () => <></>,
        // accessor: "jobStatus",
        columns: [
            {
                id: 'E10-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (row) => row.woNo,
                aggregate: 'count',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatusCode === 'W01' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'W01'}
                        columnId={'E10-WOs'}
                    />
                ),
            },
            {
                id: 'E10-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (row) => row.estimatedManHours,
                aggregate: 'sum',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatusCode === 'W01'
                                ? acc + Number(i.original.estimatedManHours) || 0
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'W01'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'E20',
        Footer: () => <></>,
        columns: [
            {
                id: 'E20-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.woNo;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatusCode === 'W01' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'W02'}
                        columnId={'E20-WOs'}
                    />
                ),
            },
            {
                id: 'E20-Est',
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
                            i.original.jobStatusCode === 'W02'
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
                        fieldKey={'jobStatusCode'}
                        value={'W02'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'E30',
        Footer: () => <></>,
        columns: [
            {
                id: 'E30-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.woNo;
                },
                aggregate: 'count',
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatusCode === 'W03' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'W03'}
                        columnId={'E30-WOs'}
                    />
                ),
            },
            {
                id: 'E30-Est',
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
                            i.original.jobStatusCode === 'W03'
                                ? acc + Number(i.original.estimatedManHours) || 0
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'E30'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'E35',
        Footer: () => <></>,
        columns: [
            {
                id: 'E35-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.woNo;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatusCode === 'E35' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'E35'}
                        columnId={'E35-WOs'}
                    />
                ),
            },
            {
                id: 'E35-Est',
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
                            i.original.jobStatusCode === 'E35'
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
                        fieldKey={'jobStatusCode'}
                        value={'E35'}
                        sumKey={'estimatedManHours'}
                    />
                ),
            },
        ],
    },
    {
        Header: 'E40',
        Footer: () => <></>,
        columns: [
            {
                id: 'E40-WOs',
                Header: 'WOs',
                width: 80,
                accessor: (item: WorkOrder): string => {
                    return item.woNo;
                },
                Aggregated: ({
                    row,
                }: React.PropsWithChildren<CellProps<WorkOrder, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatusCode === 'E40' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<WorkOrder>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatusCode'}
                        value={'E40'}
                        columnId={'E40-WOs'}
                    />
                ),
            },
            {
                id: 'E40-Est',
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
                            i.original.jobStatusCode === 'E40'
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
                        fieldKey={'jobStatusCode'}
                        value={'E40'}
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
                    return item.responsibleCode;
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
