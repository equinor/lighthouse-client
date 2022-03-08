import { CellWithLink, HandoverNCR, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
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
type TabProps = {
    packages: HandoverNCR[];
    isFetching: boolean;
};

export const NcrTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Ncr Packages"
            error={null}
        ></TabTable>
    );
};
