import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { Column } from '@equinor/Table';
import { HandoverNCR } from '../../../models';

type TabProps = {
    packages: HandoverNCR[] | undefined;
    isFetching: boolean;
};

const columns: Column<HandoverNCR>[] = [
    {
        id: 'documentNumber',
        Header: 'Document No.',
        accessor: ({ url, documentNumber }) => ({
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
            content: documentNumber,
        }),
        Cell: CellWithLink,
    },
    {
        id: 'Title',
        Header: 'Title',
        accessor: (pkg) => pkg.title,
    },
];
export const NcrTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="NCr Packages"
            error={null}
        />
    );
};
