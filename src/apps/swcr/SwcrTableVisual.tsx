import { useMemo } from 'react';
import { Column, TableInstance } from 'react-table';
import { TableVisual } from '../../packages/Diagrams/src/Visuals/TableVisual';
import { Job, mockData } from './mockData';

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

const SumColumnFooterCount = ({
    data,
    fieldKey,
    value,
    columnId,
}: FooterPropsCount<Job>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + 1 : sum;
            }, 0),
        [data.data]
    );

    return (data.state as any)?.groupBy?.includes(columnId) ? (
        <div>Total: </div>
    ) : (
        <div> {total}</div>
    );
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
        [data.data]
    );

    return <div> {total}</div>;
};
/* 
const sumClosedPackageInPercent = (
    columnValues: CellValue<SwcrStatus>[]
    // rows: Array<Row<SwcrPackage>>
): number => Math.floor((columnValues.filter(isClosed).length / columnValues.length) * 100);

 */

export function SwcrApp(): JSX.Element {
    const data = useMemo(() => mockData().filter((j) => j.jobStatus.startsWith('E')), []);

    // E10 Jobcard defined
    // E20 Jobcard estimated/Mat. Linked
    // E30 Jobcard PDF generated
    // E35 COW Jobcard created
    // E40 Jobcard sent Construction

    const columnsGroupedByDiscipline: Column<Job>[] = useMemo(
        () => [
            {
                Header: '',
                accessor: 'disciplineDescription',
                Footer: () => <></>,
                columns: [
                    {
                        Header: 'Discipline',
                        accessor: 'disciplineDescription',
                        // aggregate: 'uniqueCount',
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
                        accessor: (row) => row.job,
                        aggregate: 'count',
                        Aggregated: ({ row, ...rest }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc = i.original.jobStatus === 'E10' ? acc + 1 : acc;
                                return acc;
                            }, 0);

                            return count;
                        },
                        Footer: (data) => (
                            <SumColumnFooterCount
                                data={data}
                                fieldKey={'jobStatus'}
                                value={'E10'}
                                columnId={'E10-WOs'}
                            />
                        ),
                    },
                    {
                        id: 'E10-Est',
                        Header: 'Est mhrs',
                        accessor: (row) => row.jobEstimatedHours,
                        aggregate: 'sum',
                        Aggregated: ({ row }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc =
                                    i.original.jobStatus === 'E10'
                                        ? acc + i.original.jobEstimatedHours
                                        : acc;
                                return acc;
                            }, 0);

                            return count;
                        },
                        Footer: (data) => (
                            <SumColumnFooterSum
                                data={data}
                                fieldKey={'jobStatus'}
                                value={'E10'}
                                sumKey={'jobEstimatedHours'}
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
                        accessor: (row) => {
                            return row.job;
                        },
                        Aggregated: ({ row }) => {
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
                        accessor: (row) => {
                            return row.jobEstimatedHours;
                        },
                        Aggregated: ({ row }) => {
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
                        Footer: (data) => (
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
                        accessor: (row) => {
                            return row.job;
                        },
                        aggregate: 'count',
                        Aggregated: ({ row }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc = i.original.jobStatus === 'E30' ? acc + 1 : acc;
                                return acc;
                            }, 0);

                            return count;
                        },
                        Footer: (data) => (
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
                        accessor: (row) => {
                            return row.jobEstimatedHours;
                        },
                        aggregate: 'sum',
                        Aggregated: ({ row }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc =
                                    i.original.jobStatus === 'E30'
                                        ? acc + i.original.jobEstimatedHours
                                        : acc;
                                return acc;
                            }, 0);

                            return count;
                        },
                        Footer: (data) => (
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
                        accessor: (row) => {
                            return row.job;
                        },
                        Aggregated: ({ row }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc = i.original.jobStatus === 'E35' ? acc + 1 : acc;
                                return acc;
                            }, 0);

                            return count;
                        },
                        aggregate: 'count',
                        Footer: (data) => (
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
                        accessor: (row) => {
                            return row.jobEstimatedHours;
                        },
                        Aggregated: ({ row }) => {
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
                        Footer: (data) => (
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
                        accessor: (row) => {
                            return row.job;
                        },
                        Aggregated: ({ row }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc = i.original.jobStatus === 'E40' ? acc + 1 : acc;
                                return acc;
                            }, 0);

                            return count;
                        },
                        aggregate: 'count',
                        Footer: (data) => (
                            <SumColumnFooterCount
                                data={data}
                                fieldKey={'jobStatus'}
                                value={'E40'}
                                columnId={'E40-WOs'}
                            />
                        ),
                    },
                    {
                        id: 'E40-Est',
                        Header: 'Est mhrs',
                        accessor: (row) => {
                            return row.jobEstimatedHours;
                        },
                        Aggregated: ({ row }) => {
                            const count = row.subRows.reduce((acc, i) => {
                                acc =
                                    i.original.jobStatus === 'E40'
                                        ? acc + i.original.jobEstimatedHours
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
                                value={'E40'}
                                sumKey={'jobEstimatedHours'}
                            />
                        ),
                    },
                ],
            },
        ],
        []
    );

    // const columnsGroupedByDiscplineAndJobStatus: Column<Job>[] = useMemo(
    //     () => [
    //         {
    //             Header: 'Job Status',
    //             accessor: 'jobStatus',
    //             aggregate: 'unique',
    //         },
    //     ],
    //     []
    // );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                <TableVisual<Job>
                    data={data}
                    options={{
                        initialGroupBy: 'disciplineDescription',
                        // groupBy: [{
                        //     key: "disciplineDescription",
                        //     title: "Discipline"
                        // }],
                        columns: columnsGroupedByDiscipline,
                    }}
                />
            }
            {/* {
                <TableVisual<Job>
                    data={data}
                    options={{
                        initialGroupBy: 'jobStatus',
                        columns: columnsGroupedByDiscplineAndJobStatus,
                    }}
                />
            } */}
        </div>
    );
}
