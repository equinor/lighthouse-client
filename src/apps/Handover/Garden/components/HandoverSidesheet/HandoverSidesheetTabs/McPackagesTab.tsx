import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { FC } from 'react';
import { HandoverMcpkg } from '../../../models/handoverResources';
import {
    comparePackage,
    getRFCCStatus,
    getRFOCStatus,
    McStatusCell,
    RfccStatusCell,
    RfocStatusCell,
} from '../HandoverSidesheetStatuses';

const columns: Column<HandoverMcpkg>[] = [
    {
        id: 'mcPkgNo',
        Header: 'Mc.Pkg',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'mcPkgNo',
            url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
        }),
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
        accessor: (pkg) => pkg.mcStatus,
        Cell: McStatusCell,
        sortType: comparePackage('status'),
    },
    {
        id: 'RFCC',
        Header: 'RFCC',
        accessor: (pkg) => getRFCCStatus(pkg),
        Cell: RfccStatusCell,
        sortType: comparePackage('rfccStatus'),
    },
    {
        id: 'RFOC',
        Header: 'RFOC',
        accessor: (pkg) => getRFOCStatus(pkg),
        Cell: RfocStatusCell,
        sortType: comparePackage('rfocStatus'),
    },
];

type McPackagesTabProps = {
    packages: HandoverMcpkg[] | undefined;
    isFetching: boolean;
};

export const McPackagesTab: FC<McPackagesTabProps> = ({ packages, isFetching }) => {
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
