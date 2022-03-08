import { CellWithLink, HandoverPunch, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
const columns: Column<HandoverPunch>[] = [
    {
        id: 'tagnumber',
        Header: 'Tag',
        accessor: ({ tagNumber, url }) => ({ content: tagNumber, url }),
        Cell: CellWithLink,
    },
    {
        id: 'Description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
    },
    {
        id: 'toBeClearedBy',
        Header: 'To be cleared by',
        accessor: (pkg) => pkg.toBeClearedBy,
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (pkg) => pkg.status,
    },
    {
        id: 'sorting',
        Header: 'Sorting',
        accessor: (pkg) => pkg.sorting,
    },
];
type TabProps = {
    packages: HandoverPunch[];
    isFetching: boolean;
};

export const PunchTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Punch Packages"
            error={null}
        />
    );
};
