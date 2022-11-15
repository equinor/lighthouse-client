import { Column, Table } from '@equinor/Table';
import { TableWrapper } from '../../../styles/styles';
import { WorkflowStatus } from '@equinor/Workflow';

type TableProps = {
    statuses: WorkflowStatus[] | undefined;
};

export const StatusesTable = ({ statuses }: TableProps): JSX.Element => {
    if (!statuses || !statuses?.length) return <h2>No templates found</h2>;

    const rowHeight = 35;

    const columns: Column<WorkflowStatus>[] = [
        {
            id: 'name',
            Header: 'Workflow status',
            accessor: (item) => item.name,
            width: 250,
        },
    ];

    return (
        <TableWrapper>
            <div>
                <Table
                    data={statuses}
                    columns={columns}
                    options={{}}
                    height={rowHeight + statuses?.length * rowHeight}
                />
            </div>
        </TableWrapper>
    );
};
