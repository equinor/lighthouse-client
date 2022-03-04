import { Column } from 'react-table';
import { WorkOrderMccr } from '../../../models';
import { CellWithLink } from './Cells/CellWithLink';
import { TabTable } from './TabTable';

export type MccrTabProps = {
    packages: WorkOrderMccr[];
    isFetching: boolean;
    error: Error | null;
};
const columns: Column<WorkOrderMccr>[] = [
    {
        id: 'tagNumber',
        accessor: ({ tagNumber, tagUrl }) => ({ content: tagNumber, url: tagUrl }),
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
        accessor: ({ mcpkgNumber, mccrUrl }) => ({ content: mcpkgNumber, url: mccrUrl }),
        Header: 'McpkgNo.',
        Cell: CellWithLink,
    },
    {
        id: 'commpkgNumber',
        accessor: ({ commpkgNumber, commpkgUrl }) => ({ content: commpkgNumber, url: commpkgUrl }),
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
