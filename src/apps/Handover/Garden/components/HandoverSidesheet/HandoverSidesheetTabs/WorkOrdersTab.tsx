import { Column, Table } from '@equinor/Table';
import { HandoverWorkOrder } from '../../../models';
import { CellWithLink, NoResourceData, WorkOrderStatusCell } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverWorkOrder[];
    isFetching: boolean;
};

export const WorkOrderTab = ({ packages, isFetching }: TabProps): JSX.Element => {
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
