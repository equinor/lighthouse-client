import { CellWithLink, HandoverUnsignedAction, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
const columns: Column<HandoverUnsignedAction>[] = [
    {
        id: 'actionNumber',
        Header: '#',
        accessor: ({ actionNumber, url }) => ({ content: actionNumber, url }),
        Cell: CellWithLink,
    },
    {
        id: 'title',
        Header: 'Title',
        accessor: (pkg) => pkg.title,
    },
];
type TabProps = {
    packages: HandoverUnsignedAction[];
    isFetching: boolean;
};

export const UnsignedActionTab = ({ packages, isFetching }: TabProps): JSX.Element => {
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
