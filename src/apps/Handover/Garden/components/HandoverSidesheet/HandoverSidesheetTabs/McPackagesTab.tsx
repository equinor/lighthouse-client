import { FC } from 'react';
import { HandoverMcpkg } from '../../../models/handoverResources';
import { Column, Table } from '@equinor/Table';
import {
    CellWithLink,
    comparePackage,
    getRFCCStatus,
    getRFOCStatus,
    McStatusCell,
    NoResourceData,
    RfccStatusCell,
    RfocStatusCell,
} from '../HandoverSidesheetStatuses';

type McPackagesTabProps = {
    packages: HandoverMcpkg[];
    isFetching: boolean;
};

export const McPackagesTab: FC<McPackagesTabProps> = ({ packages, isFetching }) => {
    if (isFetching) return <NoResourceData>Fetching MC Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No MC Packages</NoResourceData>;

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

    return <Table options={{ columns: columns, data: packages }}></Table>;
};
