import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { HandoverUnsignedTask } from '../../../models';

const columns: Column<HandoverUnsignedTask>[] = [
    {
        id: 'taskNumber',
        Header: '#',
        accessor: (pkg) => ({
            content: pkg,
            url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
            currentKey: 'taskNumber',
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
    packages: HandoverUnsignedTask[] | undefined;
    isFetching: boolean;
};

export const UnsignedTaskTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Unsigned Tasks"
            error={null}
        />
    );
};
