import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { proCoSysUrls } from '@equinor/procosys-urls';
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
            url: proCoSysUrls.getTagUrl(pkg.tagUrlId ?? ''),
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
        accessor: (pkg) => ({
            content: pkg,
            url: proCoSysUrls.getFormTypeUrl(pkg.mccrUrlId ?? ''),
            currentKey: 'mccrType',
        }),
        Header: 'Type',
        Cell: CellWithLink,
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
            url: proCoSysUrls.getMcUrl(pkg.mechanicalCompletionPackageUrlId ?? ''),
            currentKey: 'mcpkgNumber',
        }),
        Header: 'McpkgNo.',
        Cell: CellWithLink,
    },
    {
        id: 'commpkgNumber',
        accessor: (pkg) => ({
            content: pkg,
            url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageUrlId ?? ''),
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
