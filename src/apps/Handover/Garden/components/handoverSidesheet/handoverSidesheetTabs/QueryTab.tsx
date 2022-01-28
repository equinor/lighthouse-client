import { HandoverQuery } from '../../../models/HandoverResources';
import { NoResourceData } from '../handoverSidesheetStatuses/NoResourceData';
import { Column, Table } from '@equinor/Table';
import { CellWithLink } from '../handoverSidesheetStatuses/CellWithLink';

export type TabProps = {
    packages: HandoverQuery[];
    isFetching: boolean;
};

const QueryTab = ({ packages, isFetching }: TabProps): JSX.Element => {
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

export default QueryTab;
