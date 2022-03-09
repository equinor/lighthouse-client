import { Column, Table } from '@equinor/Table';
import { HandoverPunch } from '../../../models';
import { CellWithLink, NoResourceData } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverPunch[];
    isFetching: boolean;
};

export const PunchTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching Punch Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No Punch Packages</NoResourceData>;

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

    return <Table options={{ columns: columns, data: packages }}></Table>;
};
