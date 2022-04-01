import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { McWorkOrder } from '../types/mcWorkOrder';
const columns: Column<McWorkOrder>[] = [
    {
        id: 'workorderNumber',
        Header: 'WO Number',
        accessor: ({ url, workOrderNumber }) => ({ content: workOrderNumber, url: url }),
        Cell: CellWithLink,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (wo) => wo.description,
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (wo) => `${wo.status} ${wo.statusDescription}`,
    },
    {
        id: 'materialStatus',
        Header: 'Material Status',
        accessor: (wo) => `${wo.materialStatus} ${wo.materialStatusDescription}`,
    },
    {
        id: 'projectProgress',
        Header: 'Progress',
        accessor: (wo) => wo.projectProgress,
    },
];
type WorkordersTabProps = {
    packages: McWorkOrder[];
    error: Error | null;
    isFetching: boolean;
};
export const WorkordersTab = ({ packages, error, isFetching }: WorkordersTabProps) => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            error={error}
            resourceName="Workorders"
        />
    );
};
