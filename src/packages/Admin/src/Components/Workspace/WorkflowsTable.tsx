import { Table } from '@equinor/Table';
import { TableWrapper } from '../../../styles/styles';
import { Workflow } from '@equinor/Workflow';
import { openWorkflowSidesheet } from './Workflows';
import { workflowColumns } from './columns';

type TableProps = {
  workflows: Workflow[] | undefined;
};

export const WorkflowsTable = ({ workflows }: TableProps): JSX.Element => {
  if (!workflows || !workflows?.length) return <h2>No workflows found</h2>;

  const rowHeight = 35;

  return (
    <TableWrapper>
      <div>
        <Table
          data={workflows}
          columns={workflowColumns()}
          options={{
            onCellClick: (cell) => {
              if (cell.column.id !== 'menu') {
                openWorkflowSidesheet(cell.row.original as Workflow);
              }
            },
          }}
          height={rowHeight + workflows?.length * rowHeight}
        />
      </div>
    </TableWrapper>
  );
};
