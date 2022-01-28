import { HandoverWorkOrder } from '../../../models/HandoverResources';
import { NoResourceData } from '../handoverSidesheetStatuses/NoResourceData';
import { Column, Table } from '@equinor/Table';
import { CellWithLink } from '../handoverSidesheetStatuses/CellWithLink';
import { WorkOrderStatusCell } from '../handoverSidesheetStatuses/WorkerOrderStatusCell';

export type TabProps = {
    packages: HandoverWorkOrder[];
    isFetching: boolean;
};

const WorkOrderTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching MC Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No MC Packages</NoResourceData>;

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

    return <Table options={{ columns: columns, data: packages }}></Table>;
};

export default WorkOrderTab;
