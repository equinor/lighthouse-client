import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
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
        accessor: (pkg) => ({
            url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
            content: pkg,
            currentKey: 'documentNumber',
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
