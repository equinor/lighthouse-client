import { HandoverUnsignedTask } from '../../../models/HandoverResources';
import { NoResourceData } from '../handoverSidesheetStatuses/NoResourceData';
import { Column, Table } from '@equinor/Table';
import { CellWithLink } from '../handoverSidesheetStatuses/CellWithLink';

export type TabProps = {
    packages: HandoverUnsignedTask[];
    isFetching: boolean;
};

const UnsignedTaskTab = ({ packages, isFetching }: TabProps): JSX.Element => {
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

export default UnsignedTaskTab;
