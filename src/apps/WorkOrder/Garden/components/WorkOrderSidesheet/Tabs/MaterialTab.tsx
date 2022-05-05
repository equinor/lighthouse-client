import { TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { WorkOrderMaterial } from '../../../models';
import { AvailableItemCell } from './Cells/AvailableItemCell';

export type MaterialPackagesTabProps = {
    packages: WorkOrderMaterial[] | undefined;
    isFetching: boolean;
    error: Error | null;
};

const columns: Column<WorkOrderMaterial>[] = [
    {
        id: 'available',
        Header: '',
        accessor: (pkg) => pkg,
        Cell: AvailableItemCell,
        width: 50,
    },
    {
        id: 'itemNumber',
        Header: '#',
        accessor: (pkg) => pkg.itemNumber,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
    },
    {
        id: 'quantity',
        Header: 'QTY',
        accessor: (pkg) => pkg.quantity,
    },
    {
        id: 'information',
        Header: 'Info',
        accessor: (pkg) => pkg.information,
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (pkg) => pkg.status,
    },
    {
        id: 'stockLocation',
        Header: 'Stock Location',
        accessor: (pkg) => pkg.stockLocation,
    },
];

export const MaterialTab = ({ packages, error, isFetching }: MaterialPackagesTabProps) => (
    <TabTable
        columns={columns}
        packages={packages}
        error={error}
        isFetching={isFetching}
        resourceName="Material Packages"
    />
);
