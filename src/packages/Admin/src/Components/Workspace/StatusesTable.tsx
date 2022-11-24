import { Table } from '@equinor/Table';
import { TableWrapper } from '../../../styles/styles';
import { WorkflowStatus } from '@equinor/Workflow';
import { statusColumns } from './columns';

type TableProps = {
    statuses: WorkflowStatus[] | undefined;
    setIsEditing: (setIsEditing: boolean) => void;
};

export const StatusesTable = ({ statuses, setIsEditing }: TableProps): JSX.Element => {
    if (!statuses || !statuses?.length) return <h2>No statuses found</h2>;

    const rowHeight = 35;

    return (
        <TableWrapper>
            <div>
                <Table
                    data={statuses}
                    columns={statusColumns(setIsEditing)}
                    options={{}}
                    height={rowHeight + statuses?.length * rowHeight}
                />
            </div>
        </TableWrapper>
    );
};
