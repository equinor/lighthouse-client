import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { Column } from '@equinor/Table';
import { HandoverWorkOrder } from '../../../models';
import { WorkOrderStatusCell } from '../HandoverSidesheetStatuses';

const columns: Column<HandoverWorkOrder>[] = [
    {
        id: 'mcPkgnNo',
        Header: '#',
        accessor: ({ workOrderNumber, url }) => ({
            content: workOrderNumber,
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
        }),
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
