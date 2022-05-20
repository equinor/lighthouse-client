import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from 'react-table';
import { WorkOrderMccr } from '../../../models';

export type MccrTabProps = {
    packages: WorkOrderMccr[] | undefined;
    isFetching: boolean;
    error: Error | null;
};
const columns: Column<WorkOrderMccr>[] = [
    {
        id: 'tagNumber',
        accessor: (pkg) => ({
            content: pkg,
            url: isProduction() ? pkg.tagUrl : pkg.tagUrl.replace('procosys', 'procosystest'),
            currentKey: 'tagNumber',
        }),
        Header: 'TagNo.',
        Cell: CellWithLink,
    },
    {
        id: 'description',
        accessor: 'description',
        Header: 'Description',
        width: 250,
    },
    {
        id: 'mccrType',
        accessor: 'mccrType',
        Header: 'Type',
    },
    {
        id: 'mccrStatus',
        accessor: 'mccrStatus',
        Header: 'Status',
        width: 85,
    },
    {
        id: 'mccrResponsible',
        accessor: 'mccrResponsible',
        Header: 'Res',
    },
    {
        id: 'mcpkgNumber',
        accessor: (pkg) => ({
            content: pkg,
            url: isProduction() ? pkg.mccrUrl : pkg.mccrUrl.replace('procosys', 'procosystest'),
            currentKey: 'mcpkgNumber',
        }),
        Header: 'McpkgNo.',
        Cell: CellWithLink,
    },
    {
        id: 'commpkgNumber',
        accessor: (pkg) => ({
            content: pkg,
            url: isProduction()
                ? pkg.commpkgUrl
                : pkg.commpkgUrl.replace('procosys', 'procosystest'),
            currentKey: 'commpkgNumber',
        }),
        Header: 'CommpkgNo.',
        Cell: CellWithLink,
    },
];
export const MccrTab = ({ packages, error, isFetching }: MccrTabProps) => (
    <TabTable
        columns={columns}
        packages={packages}
        error={error}
        isFetching={isFetching}
        resourceName="MCCR Packages"
    />
);
