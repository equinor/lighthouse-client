import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { HandoverQuery } from '../../../models';

const columns: Column<HandoverQuery>[] = [
    {
        id: 'queryNumber',
        Header: 'QueryNo',
        accessor: (pkg) => ({
            content: pkg,
            url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
            currentKey: 'queryNumber',
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
