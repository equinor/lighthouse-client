import { Column, Table } from '@equinor/Table';
import { TableWrapper } from '../../../styles/styles';
import { Workflow } from '@equinor/Workflow';
import { openWorkflowSidesheet } from './Workflows';

type TableProps = {
    workflows: Workflow[] | undefined;
    app: string;
};

export const WorkflowsTable = ({ workflows }: TableProps): JSX.Element => {
    if (!workflows || !workflows?.length) return <h2>No templates found</h2>;

    const rowHeight = 35;

    const columns: Column<Workflow>[] = [
        {
            id: 'workflowTemplate',
            Header: 'Workflow template',
            accessor: (item) => item.name,
            width: 250,
        },
    ];

    return (
        <TableWrapper>
            <div>
                <Table
                    data={workflows}
                    columns={columns}
                    options={{
                        onCellClick: (cell) => {
                            openWorkflowSidesheet(cell.row.original as Workflow);
                        },
                    }}
                    height={rowHeight + workflows?.length * rowHeight}
                />
            </div>
        </TableWrapper>
    );
};
