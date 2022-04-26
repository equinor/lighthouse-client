import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { Column } from '@equinor/Table';
import { HandoverUnsignedTask } from '../../../models';

const columns: Column<HandoverUnsignedTask>[] = [
    {
        id: 'taskNumber',
        Header: '#',
        accessor: ({ taskNumber, url }) => ({
            content: taskNumber,
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
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
    packages: HandoverUnsignedTask[];
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
