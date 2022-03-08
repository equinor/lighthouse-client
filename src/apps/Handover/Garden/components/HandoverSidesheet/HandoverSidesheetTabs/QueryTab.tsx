import { CellWithLink, HandoverQuery, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
const columns: Column<HandoverQuery>[] = [
    {
        id: 'QueryNo',
        Header: 'QueryNo',
        accessor: ({ queryNumber, url }) => ({ content: queryNumber, url }),
        Cell: CellWithLink,
    },
    {
        id: 'Title',
        Header: 'Title',
        accessor: (pkg) => pkg.title,
    },
    {
        id: 'Status',
        Header: 'Status',
        accessor: (pkg) => pkg.status,
    },
    {
        id: 'nextToSign',
        Header: 'Next to Sign',
        accessor: (pkg) => pkg.nextToSign,
    },
];
type TabProps = {
    packages: HandoverQuery[];
    isFetching: boolean;
};

export const QueryTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Query Packages"
            error={null}
        />
    );
};
