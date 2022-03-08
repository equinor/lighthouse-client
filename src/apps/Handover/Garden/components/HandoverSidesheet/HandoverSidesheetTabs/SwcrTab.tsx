import { CellWithLink, HandoverSWCR, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
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
type TabProps = {
    packages: HandoverSWCR[];
    isFetching: boolean;
};

export const SwcrTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="SWCR Packages"
            error={null}
        />
    );
};
