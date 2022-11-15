import { Table } from '@equinor/Table';
import { TableWrapper } from '../../../styles/styles';
import { WorkflowStepTemplate } from '@equinor/Workflow';
import { workflowStepsTableColumns } from './columns';

type TableProps = {
    steps: WorkflowStepTemplate[] | undefined;
};

export const WorkflowStepsTable = ({ steps }: TableProps): JSX.Element => {
    if (!steps || !steps?.length) return <h2>No steps found</h2>;

    const rowHeight = 35;

    return (
        <TableWrapper>
            <div>
                <Table
                    data={steps}
                    columns={workflowStepsTableColumns}
                    options={{}}
                    height={rowHeight + steps?.length * rowHeight}
                />
            </div>
        </TableWrapper>
    );
};
