import {
    CellWithLink,
    PROCOSYS_PROD_JC_BASE_URL,
    PROCOSYS_TEST_JC_BASE_URL,
    TabTable,
} from '@equinor/GardenUtils';
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
            url: isProduction()
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion#Tag|${pkg.tagId}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion#Tag|${pkg.tagId}`,
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
            url: isProduction()
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion/TagCheck/Form/Main/Index?id=${pkg.mccrId}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion/TagCheck/Form/Main/Index?id=${pkg.mccrId}`,
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
            url: isProduction()
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion#McPkg|${pkg.mcpkgNumber}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion#McPkg|${pkg.mcpkgNumber}`,
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
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion#CommPkg|${pkg.commpkgNumber}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion#CommPkg|${pkg.commpkgNumber}`,
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
