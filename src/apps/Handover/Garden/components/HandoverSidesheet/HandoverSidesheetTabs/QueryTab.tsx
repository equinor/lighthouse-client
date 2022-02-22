import { Column, Table } from '@equinor/Table';
import { HandoverQuery } from '../../../models';
import { CellWithLink, NoResourceData } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverQuery[];
    isFetching: boolean;
};

export const QueryTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching Query Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No Query Packages</NoResourceData>;
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

    return <Table options={{ columns: columns, data: packages }}></Table>;
};
