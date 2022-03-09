import { Column, Table } from '@equinor/Table';
import { HandoverNCR } from '../../../models';
import { CellWithLink, NoResourceData } from '../HandoverSidesheetStatuses';

type TabProps = {
    packages: HandoverNCR[];
    isFetching: boolean;
};

export const NcrTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    if (isFetching) return <NoResourceData>Fetching NCr Packages</NoResourceData>;

    if (!packages.length) return <NoResourceData>No NCr Packages</NoResourceData>;

    const columns: Column<HandoverNCR>[] = [
        {
            id: 'documentNumber',
            Header: 'Document No.',
            accessor: ({ url, documentNumber }) => ({ url, content: documentNumber }),
            Cell: CellWithLink,
        },
        {
            id: 'Title',
            Header: 'Title',
            accessor: (pkg) => pkg.title,
        },
    ];
    return <Table options={{ columns: columns, data: packages }}></Table>;
};
