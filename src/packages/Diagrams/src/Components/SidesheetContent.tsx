import { Column, useColumns, LinkCell, Table } from '@equinor/Table';
import { WorkOrder } from '../../../../apps/Construction/mocData/mockData';

interface Props<T> {
    data: T[];
}
export function SidesheetContent<T>({ data }: Props<T>) {
    const columns = useColumns(data[0] as any);
    const customCol: Column<WorkOrder> = {
        id: 'procosyslink',
        accessor: (row) => ({
            content: `https://procosys.equinor.com/JOHAN_CASTBERG/WorkOrders/WorkOrder#id=${row['sourceIdentity']}`,
        }),
        Header: '',
        Cell: LinkCell,
        width: '25px',
    };
    columns.push(customCol);
    return (
        <div>{data && <Table options={{ data, columns, columnOrder: ['procosyslink'] }} />}</div>
    );
}
