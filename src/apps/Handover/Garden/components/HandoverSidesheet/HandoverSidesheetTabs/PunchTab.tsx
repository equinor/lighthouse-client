import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { HandoverPunch } from '../../../models';

type TabProps = {
  isFetching: boolean;
  packages: HandoverPunch[] | undefined;
};

const columns: Column<HandoverPunch>[] = [
  {
    id: 'tagNumber',
    Header: 'Tag',
    accessor: (pkg) => ({
      content: pkg,
      url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
      currentKey: 'tagNumber',
    }),
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
export const PunchTab = ({ packages, isFetching }: TabProps): JSX.Element => {
  return (
    <TabTable
      columns={columns}
      packages={packages}
      isFetching={isFetching}
      resourceName="Punch"
      error={null}
    />
  );
};
