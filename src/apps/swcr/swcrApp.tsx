import { useMemo } from 'react';
import { CellValue, Column, TableInstance } from 'react-table';
import { GroupBy, TableVisual } from '../../packages/Diagrams/src/Visuals/TableVisual';

import { mockData, Job } from './mockData';

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
/* 
const sumClosedPackageInPercent = (
    columnValues: CellValue<SwcrStatus>[]
    // rows: Array<Row<SwcrPackage>>
): number => Math.floor((columnValues.filter(isClosed).length / columnValues.length) * 100);

 */

export function SwcrApp(): JSX.Element {
    const data = useMemo(() => mockData().filter((j) => j.jobStatus.startsWith('E')), []);

    const columnsGroupedByDiscipline: Column<Job>[] = useMemo(
        () => [
            {
                Header: 'Discipline',
                accessor: 'disciplineDescription',
                aggregate: 'uniqueCount',
                Footer: (data) => (
                    <SumColumnFooter data={data} columnId={'disciplineDescription'} />
                ),
            },
            {
                Header: 'WOs',
                accessor: 'job',
                aggregate: 'uniqueCount',
                Footer: (data) => <SumColumnFooter data={data} columnId={'job'} />,
            },
            {
                Header: 'Est mhrs',
                accessor: 'jobEstimatedHours',
                aggregate: 'sum',
                Footer: (data) => <SumColumnFooter data={data} columnId={'jobEstimatedHours'} />,
            },
        ],
        []
    );

    const columnsGroupedByDiscplineAndJobStatus: Column<Job>[] = useMemo(
        () => [
            {
                Header: 'Job Status',
                accessor: 'jobStatus',
                aggregate: 'unique',
            },
        ],
        []
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                <TableVisual<Job>
                    data={data}
                    options={{
                        initialGroupBy: 'disciplineDescription',
                        columns: columnsGroupedByDiscipline,
                    }}
                />
            }
            {
                <TableVisual<Job>
                    data={data}
                    options={{
                        initialGroupBy: 'jobStatus',
                        columns: columnsGroupedByDiscplineAndJobStatus,
                    }}
                />
            }
        </div>
    );
}
