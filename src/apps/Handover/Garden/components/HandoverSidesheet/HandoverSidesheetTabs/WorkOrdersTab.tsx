import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { HandoverWorkOrder } from '../../../models';
import { getHandoverWorkOrderStatus, WorkOrderStatusCell } from '../HandoverSidesheetStatuses';

const columns: Column<HandoverWorkOrder>[] = [
    {
        id: 'workOrderNumber',
        Header: '#',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'workOrderNumber',
            url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
        }),
        Cell: CellWithLink,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
    },
    {
        Header: 'Status',
        accessor: (pkg) => getHandoverWorkOrderStatus(pkg),
        Cell: WorkOrderStatusCell,
    },
    {
        id: 'Progress',
        Header: 'Progress',
        accessor: (pkg) => `${pkg.projectProgress}%`,
    },
];

type TabProps = {
    packages: HandoverWorkOrder[] | undefined;
    isFetching: boolean;
};

export const WorkOrderTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Work Orders"
            error={null}
        />
    );
};
