import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { HandoverUnsignedAction } from '../../../models';

const columns: Column<HandoverUnsignedAction>[] = [
    {
        id: 'actionNumber',
        Header: '#',
        accessor: (pkg) => ({
            content: pkg,
            url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
            currentKey: 'actionNumber',
        }),
        Cell: CellWithLink,
    },
    {
        id: 'title',
        Header: 'Title',
        accessor: (pkg) => pkg.title,
    },
];

type TabProps = {
    packages: HandoverUnsignedAction[] | undefined;
    isFetching: boolean;
};

export const UnsignedActionTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Unsigned Actions"
            error={null}
        />
    );
};
