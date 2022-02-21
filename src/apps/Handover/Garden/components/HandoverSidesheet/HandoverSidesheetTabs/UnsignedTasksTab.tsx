import { Column, Table } from '@equinor/Table';
import { HandoverUnsignedTask } from '../../../models';
import { CellWithLink, NoResourceData } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverUnsignedTask[];
    isFetching: boolean;
};

export const UnsignedTaskTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching MC Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No MC Packages</NoResourceData>;

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

    return <Table options={{ columns: columns, data: packages }}></Table>;
};
