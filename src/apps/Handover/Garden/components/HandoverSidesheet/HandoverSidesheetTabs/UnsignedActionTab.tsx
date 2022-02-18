import { Column, Table } from '@equinor/Table';
import { HandoverUnsignedAction } from '../../../models';
import { CellWithLink, NoResourceData } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverUnsignedAction[];
    isFetching: boolean;
};

export const UnsignedActionTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching MC Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No MC Packages</NoResourceData>;

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

    return <Table options={{ columns: columns, data: packages }}></Table>;
};
