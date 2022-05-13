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
        accessor: ({ tagNumber }) => ({
            content: tagNumber,
            url: isProduction()
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion#Tag|${tagNumber}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion#Tag|${tagNumber}`,
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
        accessor: ({ mcpkgNumber }) => ({
            content: mcpkgNumber,
            url: isProduction()
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion/TagCheck/Form/Main/Index?id=${mcpkgNumber}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion/TagCheck/Form/Main/Index?id=${mcpkgNumber}`,
        }),
        Header: 'McpkgNo.',
        Cell: CellWithLink,
    },
    {
        id: 'commpkgNumber',
        accessor: ({ commpkgNumber }) => ({
            content: commpkgNumber,
            url: isProduction()
                ? `${PROCOSYS_PROD_JC_BASE_URL}/Completion#CommPkg|${commpkgNumber}`
                : `${PROCOSYS_TEST_JC_BASE_URL}/Completion#CommPkg|${commpkgNumber}`,
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
