import { Column } from '@equinor/Table';
import React, { ExoticComponent, MemoExoticComponent, useMemo } from 'react';
import { CellProps, TableInstance } from 'react-table';
import { Job } from '../mocData/mockData';

type FooterProps<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    columnId: string;
};

const SumColumnFooter = ({ data, columnId }: FooterProps<Job>): JSX.Element => {
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

const SumColumnFooterCount = ({ data, fieldKey, value }: FooterPropsCount<Job>): JSX.Element => {
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

const SumColumnFooterCountTotal = ({ data, fieldKey }: FooterPropsCountTotal<Job>): JSX.Element => {
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
}: FooterPropsSum<Job>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + Number(row[sumKey]) : sum;
            }, 0),
        [data.data, fieldKey, sumKey, value]
    );

    return <div> {total}</div>;
};
type SumColumnFooterType<T extends Record<string, unknown>> = Omit<FooterProps<T>, 'data'> & {
    type: 'SumColumnFooter';
};
type SumColumnFooterCountType<T extends Record<string, unknown>> = Omit<
    FooterPropsCount<T>,
    'data'
> & {
    type: 'SumColumnFooterCount';
};
type SumColumnFooterCountTotalType<T extends Record<string, unknown>> = Omit<
    FooterPropsCountTotal<T>,
    'data'
> & {
    type: 'SumColumnFooterCountTotal';
};
type SumColumnFooterSumType<T extends Record<string, unknown>> = Omit<FooterPropsSum<T>, 'data'> & {
    type: 'SumColumnFooterSum';
};

export const columnGenerator = <T extends Record<string, unknown>>(
    id: string,
    header: string,
    accessorKey: keyof Job,
    aggregate: 'sum' | 'count',
    footerType:
        | SumColumnFooterType<T>
        | SumColumnFooterSumType<T>
        | SumColumnFooterCountType<T>
        | SumColumnFooterCountTotalType<T>,
    jobStatus: string,
    width = 100
) => {
    return {
        id,
        Header: header,
        width: width,
        accessor: (item) => {
            return item[accessorKey];
        },
        Aggregated: ({ row }) => {
            const count = row.subRows.reduce((acc, i) => {
                if (aggregate === 'count') {
                    acc = i.original.jobStatus === jobStatus ? acc + 1 : acc;
                    return acc;
                } else {
                    acc = i.original.jobStatus === jobStatus ? acc + i.original[accessorKey] : acc;
                    return acc;
                }
            }, 0);
            debugger;
            return count;
        },
        aggregate,
        Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => {
            switch (footerType.type) {
                case 'SumColumnFooterCount':
                    return (
                        <SumColumnFooterCount
                            data={data}
                            columnId={id}
                            fieldKey={accessorKey}
                            value={footerType.value}
                        />
                    );

                case 'SumColumnFooter':
                    return <SumColumnFooter data={data} columnId={id} />;

                case 'SumColumnFooterCountTotal':
                    return <SumColumnFooterCountTotal data={data} fieldKey={accessorKey} />;
                case 'SumColumnFooterSum':
                    return (
                        <SumColumnFooterSum
                            data={data}
                            fieldKey={footerType.fieldKey as any}
                            value={footerType.value}
                            sumKey={footerType.sumKey as any}
                        />
                    );
            }
        },
    };
};

export const cols: Column<Job>[] = [
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
        Header: "E10",
        Footer: () => <></>,
        columns: [columnGenerator("E10-WOs", "WOs", 'job', 'count')];
    }
]
export const tableColumns: Column<Job>[] = [
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
            columnGenerator(
                'E10-WOs',
                'WOs',
                'job',
                'count',
                {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatus',
                    value: 'E10',
                    columnId: 'E10-WOs',
                },
                'E10'
            ),
            // {
            //     id: 'E10-WOs',
            //     Header: 'WOs',
            //     width: 80,
            //     accessor: (row) => row.job,
            //     aggregate: 'count',
            //     Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
            //         const count = row.subRows.reduce((acc, i) => {
            //             acc = i.original.jobStatus === 'E10' ? acc + 1 : acc;
            //             return acc;
            //         }, 0);

            //         return count;
            //     },
            //     Footer: (data) => (
            //         <SumColumnFooterCount
            //             data={data}
            //             fieldKey={'jobStatus'}
            //             value={'E10'}
            //             columnId={'E10-WOs'}
            //         />
            //     ),
            // },
            columnGenerator(
                'E10-Est',
                'Est mhrs',
                'jobEstimatedHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatus',
                    value: 'E10',
                    sumKey: 'jobEstimatedHours',
                },
                'E10',
                80
            ),

            // {
            //     id: 'E10-Est',
            //     Header: 'Est mhrs',
            //     width: 80,
            //     accessor: (row) => row.jobEstimatedHours,
            //     aggregate: 'sum',
            //     Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
            //         const count = row.subRows.reduce((acc, i) => {
            //             acc =
            //                 i.original.jobStatus === 'E10'
            //                     ? acc + i.original.jobEstimatedHours
            //                     : acc;
            //             return acc;
            //         }, 0);

            //         return count;
            //     },
            //     Footer: (data) => (
            //         <SumColumnFooterSum
            //             data={data}
            //             fieldKey={'jobStatus'}
            //             value={'E10'}
            //             sumKey={'jobEstimatedHours'}
            //         />
            //     ),
            // },
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
                accessor: (item: Job): string => {
                    return item.job;
                },
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'E20' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E20'}
                        columnId={'E20-WOs'}
                    />
                ),
            },
            {
                id: 'E20-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: Job): number => {
                    return item.jobEstimatedHours;
                },
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'E20'
                                ? acc + i.original.jobEstimatedHours
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E20'}
                        sumKey={'jobEstimatedHours'}
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
                accessor: (item: Job): string => {
                    return item.job;
                },
                aggregate: 'count',
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'E30' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E30'}
                        columnId={'E30-WOs'}
                    />
                ),
            },
            {
                id: 'E30-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: Job): number => {
                    return item.jobEstimatedHours;
                },
                aggregate: 'sum',
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'E30'
                                ? acc + i.original.jobEstimatedHours
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E30'}
                        sumKey={'jobEstimatedHours'}
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
                accessor: (item: Job): string => {
                    return item.job;
                },
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'E35' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E35'}
                        columnId={'E35-WOs'}
                    />
                ),
            },
            {
                id: 'E35-Est',
                Header: 'Est mhrs',
                width: 80,
                accessor: (item: Job): number => {
                    return item.jobEstimatedHours;
                },
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc =
                            i.original.jobStatus === 'E35'
                                ? acc + i.original.jobEstimatedHours
                                : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterSum
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E35'}
                        sumKey={'jobEstimatedHours'}
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
                accessor: (item: Job): string => {
                    return item.job;
                },
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = i.original.jobStatus === 'E40' ? acc + 1 : acc;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterCount
                        data={data}
                        fieldKey={'jobStatus'}
                        value={'E40'}
                        columnId={'E40-WOs'}
                    />
                ),
            },
            columnGenerator(
                'Est mhrs',
                'E40-Est',
                'jobEstimatedHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatus',
                    value: 'E40',
                    sumKey: 'jobEstimatedHours',
                },
                'E40'
            ),
            // {
            //     id: 'E40-Est',
            //     Header: 'Est mhrs',
            //     width: 80,
            //     accessor: (item: Job): number => {
            //         return item.jobEstimatedHours;
            //     },
            //     Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
            //         const count = row.subRows.reduce((acc, i) => {
            //             acc =
            //                 i.original.jobStatus === 'E40'
            //                     ? acc + i.original.jobEstimatedHours
            //                     : acc;
            //             return acc;
            //         }, 0);

            //         return count;
            //     },
            //     aggregate: 'sum',
            //     Footer: (data) => (
            //         <SumColumnFooterSum
            //             data={data}
            //             fieldKey={'jobStatus'}
            //             value={'E40'}
            //             sumKey={'jobEstimatedHours'}
            //         />
            //     ),
            // },
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
                accessor: (item: Job): string => {
                    return item.discipline;
                },
                aggregate: 'count',
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>): JSX.Element => {
                    return <SumColumnFooter data={data} columnId={'Total-WOs'} />;
                },
            },
            {
                id: 'Total-Est',
                Header: 'Est mhrs',
                width: 100,
                accessor: (item: Job): number => {
                    return item.jobEstimatedHours;
                },
                Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
                    const count = row.subRows.reduce((acc, i) => {
                        acc = acc + i.original.jobEstimatedHours;
                        return acc;
                    }, 0);

                    return count;
                },
                aggregate: 'sum',
                Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
                    <SumColumnFooterCountTotal data={data} fieldKey={'jobEstimatedHours'} />
                ),
            },
        ],
    },
];
