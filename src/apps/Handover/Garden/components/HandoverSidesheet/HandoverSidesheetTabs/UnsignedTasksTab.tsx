import { CellWithLink, HandoverUnsignedTask, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
const columns: Column<HandoverUnsignedTask>[] = [
    {
        id: 'taskNumber',
        Header: '#',
        accessor: ({ taskNumber, url }) => ({ content: taskNumber, url }),
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
            resourceName="MC Packages"
            error={null}
        />
    );
};
