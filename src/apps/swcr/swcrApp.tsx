import { useMemo } from 'react';
import { CellValue, Row, Column, TableInstance } from 'react-table';
import { GroupBy, TableVisual } from '../../packages/Diagrams/src/Visuals/TableVisual';
import { createData, SwcrPackage, SwcrStatus } from './mockData';

type FooterProps<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    columnId: string;
};

const groupBy: GroupBy<SwcrPackage>[] = [
    { key: 'controlSystem', title: 'Control System' },
    { key: 'supplier', title: 'Supplier' },
    { key: 'swcrId', title: 'SWCR' },
];

const isClosed = (status: SwcrStatus) => status === 'Closed';

const SumColumnFooter = ({ data, columnId }: FooterProps<SwcrPackage>): JSX.Element => {
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

const sumClosedPackageInPercent = (
    columnValues: CellValue<SwcrStatus>[]
    // rows: Array<Row<SwcrPackage>>
): number => Math.floor((columnValues.filter(isClosed).length / columnValues.length) * 100);

const sumClosedPackage = (
    columnValues: CellValue<SwcrStatus>[]
    // rows: Array<Row<SwcrPackage>>
): number => columnValues.reduce((sum, v) => (isClosed(v) ? sum + 1 : sum), 0);

const sumOpenPackage = (
    columnValues: CellValue<SwcrStatus>[]
    // rows: Array<Row<SwcrPackage>>
): number => columnValues.reduce((sum, v) => (!isClosed(v) ? sum + 1 : sum), 0);

const PercentBarColumn = ({ percent }: { percent: number }): JSX.Element => (
    <div
        style={{
            background: `linear-gradient(90deg,${'#2cd51c'} ${percent}%,${'white'} ${percent}%)`,
        }}
    >
        <span>{percent}%</span>
    </div>
);

export function SwcrApp(): JSX.Element {
    const data = createData(1000);

    const columns: Column<SwcrPackage>[] = useMemo(
        () => [
            {
                Header: 'Control System',
                accessor: 'controlSystem',
                aggregate: 'uniqueCount',
                Footer: (data) => <SumColumnFooter data={data} columnId={'controlSystem'} />,
            },
            {
                Header: 'Suppliers',
                accessor: 'supplier',
                aggregate: 'uniqueCount',
                Footer: (data) => <SumColumnFooter data={data} columnId={'supplier'} />,
            },
            {
                Header: 'SWCRs',
                accessor: 'swcrId',
                aggregate: 'count',
                Footer: (data) => <SumColumnFooter data={data} columnId={'swcrId'} />,
            },
            {
                Header: 'Open',
                accessor: (pkg) => pkg.status,
                aggregate: sumOpenPackage,
                Footer: (data) => <SumColumnFooter data={data} columnId={'Open'} />,
            },
            {
                Header: 'Closed',
                accessor: (pkg) => pkg.status,
                aggregate: sumClosedPackage,
                Footer: (data) => <SumColumnFooter data={data} columnId={'Closed'} />,
            },
            {
                Header: 'Closed %',
                accessor: (pkg) => pkg.status,
                aggregate: sumClosedPackageInPercent,
                Aggregated: (cell) => <PercentBarColumn percent={cell.value} />,
                Footer: (data) => {
                    const closed = useMemo(
                        () => data.rows.reduce((sum, row) => sum + row.values['Closed'], 0),
                        [data.rows]
                    );
                    const totalPercent = Math.floor((closed / (data as any).data.length) * 100);
                    return <PercentBarColumn percent={totalPercent} />;
                },
            },
        ],
        []
    );

    return (
        <TableVisual<SwcrPackage>
            data={data}
            options={{
                initialGroupBy: 'controlSystem',
                groupBy,
                columns,
            }}
        />
    );
}
