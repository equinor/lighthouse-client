import { Column, Table } from '@equinor/Table';
import { TableWrapper } from '../../../styles/styles';
import { WorkflowStepTemplate } from '@equinor/Workflow';

type TableProps = {
    steps: WorkflowStepTemplate[] | undefined;
};

export const WorkflowStepsTable = ({ steps }: TableProps): JSX.Element => {
    if (!steps || !steps?.length) return <h2>No steps found</h2>;

    const rowHeight = 35;

    const columns: Column<WorkflowStepTemplate>[] = [
        {
            id: 'order',
            Header: 'Order',
            accessor: (item) => item.order,
            width: 75,
        },
        {
            id: 'name',
            Header: 'Name',
            accessor: (item) => item.name,
            width: 250,
        },
        {
            id: 'completedStatusName',
            Header: 'Completed status name',
            accessor: (item) => item.completedStatusName,
            width: 250,
        },
        {
            id: 'rejectedStatusName',
            Header: 'Rejected status name',
            accessor: (item) => item.rejectedStatusName,
            width: 250,
        },
    ];

    return (
        <TableWrapper>
            <div>
                <Table
                    data={steps}
                    columns={columns}
                    options={{}}
                    height={rowHeight + steps?.length * rowHeight}
                />
            </div>
        </TableWrapper>
    );
};
