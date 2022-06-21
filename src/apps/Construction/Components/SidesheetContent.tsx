import { SidesheetApi } from '@equinor/sidesheet';
import { Column, LinkCell, Table, TableData, useColumns } from '@equinor/Table';
import { proCoSysUrls } from '../../../packages/ProCoSysUrls/procosysUrl';
import { WorkOrder } from '../Types';

interface Data<T> {
    data: T[];
}

interface SidesheetContentProps {
    item: Data<unknown>;
    actions: SidesheetApi;
}

export function SidesheetContent<T>({ actions, item }: SidesheetContentProps): JSX.Element {
    const data = item.data as TableData[];
    const columns = useColumns(data[0] as any, false);
    const customCol: Column<WorkOrder> = {
        id: 'procosyslink',
        accessor: (row) => ({
            content: proCoSysUrls.getWorkOrderUrl(row['sourceIdentity'] ?? ''),
        }),
        Header: '',
        Cell: LinkCell,
        width: '25px',
    };
    columns.push(customCol);
    return (
        <div>
            {data && (
                <Table data={data} columns={columns} options={{ columnOrder: ['procosyslink'] }} />
            )}
        </div>
    );
}
