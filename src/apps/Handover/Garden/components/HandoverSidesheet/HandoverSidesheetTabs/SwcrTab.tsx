import { Column, Table } from '@equinor/Table';
import { HandoverSWCR } from '../../../models';
import { CellWithLink, NoResourceData } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverSWCR[];
    isFetching: boolean;
};

export const SwcrTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching SWCR Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No SWCR Packages</NoResourceData>;

    const columns: Column<HandoverSWCR>[] = [
        {
            id: 'swcrNumber',
            Header: '#',
            accessor: ({ swcrNumber, url }) => ({ content: swcrNumber, url }),
            Cell: CellWithLink,
        },
        {
            id: 'description',
            Header: 'Description',
            accessor: (pkg) => pkg.description,
        },
        {
            id: 'status',
            Header: 'Status',
            accessor: (pkg) => pkg.status,
        },
        {
            id: 'priority',
            Header: 'Priority',
            accessor: (pkg) => pkg.priority,
        },
    ];

    return <Table options={{ columns: columns, data: packages }}></Table>;
};
