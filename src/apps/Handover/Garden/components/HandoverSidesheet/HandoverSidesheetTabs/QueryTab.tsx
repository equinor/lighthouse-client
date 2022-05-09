import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { Column } from '@equinor/Table';
import { HandoverQuery } from '../../../models';

const columns: Column<HandoverQuery>[] = [
    {
        id: 'QueryNo',
        Header: 'QueryNo',
        accessor: ({ queryNumber, url }) => ({
            content: queryNumber,
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
        }),
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
    packages: HandoverQuery[] | undefined;
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
