import { CellWithLink, HandoverWorkOrder, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { WorkOrderStatusCell } from '../HandoverSidesheetStatuses';
const columns: Column<HandoverWorkOrder>[] = [
    {
        id: 'mcPkgnNo',
        Header: '#',
        accessor: ({ workOrderNumber, url }) => ({ content: workOrderNumber, url }),
        Cell: CellWithLink,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
    },
    {
        id: 'Status',
        Header: 'Status',
        accessor: (pkg) => pkg,
        Cell: WorkOrderStatusCell,
    },
    {
        id: 'Progress',
        Header: 'Progress',
        accessor: (pkg) => `${pkg.projectProgress}%`,
    },
];

type TabProps = {
    packages: HandoverWorkOrder[];
    isFetching: boolean;
};

export const WorkOrderTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="MC Packages"
            error={null}
        />
    );
};
