import { FC } from 'react';
import { HandoverMcpkg } from '../../models/HandoverResources';
import { Column, Table } from '@equinor/Table';
import { McStatusCell } from '../handoverSidesheetStatuses/McStatusCell';
import { RfocStatusCell } from '../handoverSidesheetStatuses/RfocStatusCell';
import { RfccStatusCell } from '../handoverSidesheetStatuses/RfccStatusCell';
import { getRFCCStatus } from '../../utility/getKeyFunctions';

export type McPackagesTabProps = {
    packages: HandoverMcpkg[];
    isFetching: boolean;
};

const McPackagesTab: FC<McPackagesTabProps> = ({ packages, isFetching }) => {
    if (isFetching) return <div>Fetching McPackages</div>;

    const columns: Column<HandoverMcpkg>[] = [
        {
            id: 'timcPkgNotle',
            Header: 'Mc.Pkg',
            accessor: ({ mcPkgNo, url }) => ({ content: mcPkgNo, url }),
        },
        {
            id: 'title',
            Header: 'Title',
            accessor: (pkg) => pkg.description,
            width: '40%',
        },
        {
            id: 'Status',
            Header: 'Status',
            accessor: ({ mcStatus }) => ({ status: mcStatus, showOk: true }),
            Cell: McStatusCell,
        },
        {
            id: 'RFCC',
            Header: 'RFCC',
            accessor: (pkg) => ({ rfccStatus: getRFCCStatus(pkg) }),
            Cell: RfccStatusCell,
        },
        {
            id: 'RFOC',
            Header: 'RFOC',
            accessor: (pkg) => ({ rfocStatus: getRFCCStatus(pkg) }),
            Cell: RfocStatusCell,
        },
    ];

    return <Table options={{ columns: columns, data: packages }}></Table>;
};

export default McPackagesTab;

{
    /* <TabTable<HandoverMcpkg>
            packages={packages}
            columns={columns}
            isFetching={isFetching}
            error={error}
            resourceName={'MC Packages'}
        /> */
}
