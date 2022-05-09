import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { Column } from '@equinor/Table';
import { HandoverUnsignedAction } from '../../../models';

const columns: Column<HandoverUnsignedAction>[] = [
    {
        id: 'actionNumber',
        Header: '#',
        accessor: ({ actionNumber, url }) => ({
            content: actionNumber,
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
        }),
        Cell: CellWithLink,
    },
    {
        id: 'title',
        Header: 'Title',
        accessor: (pkg) => pkg.title,
    },
];

type TabProps = {
    packages: HandoverUnsignedAction[] | undefined;
    isFetching: boolean;
};

export const UnsignedActionTab = ({ packages, isFetching }: TabProps): JSX.Element => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            resourceName="Unsigned Actions"
            error={null}
        />
    );
};
