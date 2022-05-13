import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { HandoverSWCR } from '../../../models';

const columns: Column<HandoverSWCR>[] = [
    {
        id: 'swcrNumber',
        Header: '#',
        accessor: ({ swcrNumber, url }) => ({
            content: swcrNumber,
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
        }),
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
    packages: HandoverSWCR[] | undefined;
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
