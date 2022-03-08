import { FC } from 'react';
import { Column } from '@equinor/Table';
import {
    comparePackage,
    getRFCCStatus,
    getRFOCStatus,
    McStatusCell,
    RfccStatusCell,
    RfocStatusCell,
} from '../HandoverSidesheetStatuses';
import { CellWithLink, HandoverMcpkg, TabTable } from '@equinor/GardenUtils';

const columns: Column<HandoverMcpkg>[] = [
    {
        id: 'timcPkgNotle',
        Header: 'Mc.Pkg',
        accessor: ({ mcPkgNo, url }) => ({ content: mcPkgNo, url }),
        Cell: CellWithLink,
    },
    {
        id: 'title',
        Header: 'Title',
        accessor: (pkg) => pkg.description,
    },
    {
        id: 'Status',
        Header: 'Status',
        accessor: ({ mcStatus }) => ({ status: mcStatus, showOk: true }),
        Cell: McStatusCell,
        sortType: comparePackage('status'),
    },
    {
        id: 'RFCC',
        Header: 'RFCC',
        accessor: (pkg) => ({ rfccStatus: getRFCCStatus(pkg) }),
        Cell: RfccStatusCell,
        sortType: comparePackage('rfccStatus'),
    },
    {
        id: 'RFOC',
        Header: 'RFOC',
        accessor: (pkg) => ({ rfocStatus: getRFOCStatus(pkg) }),
        Cell: RfocStatusCell,
        sortType: comparePackage('rfocStatus'),
    },
];
type McPackagesTabProps = {
    packages: HandoverMcpkg[];
    isFetching: boolean;
};

export const McPackagesTab: FC<McPackagesTabProps> = ({ packages, isFetching }) => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="MC packages"
            error={null}
        ></TabTable>
    );
};
