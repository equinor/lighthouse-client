import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column, DescriptionCell, ProgressCell } from '@equinor/Table';
import { McWorkOrder } from '../types/mcWorkOrder';
const columns: Column<McWorkOrder>[] = [
  {
    id: 'workOrderNumber',
    Header: 'WO Number',
    accessor: (pkg) => ({
      content: pkg,
      url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
      currentKey: 'workOrderNumber',
    }),
    Cell: CellWithLink,
    width: 130,
  },
  {
    id: 'description',
    Header: 'Description',
    accessor: (wo) => ({ content: wo, currentKey: 'description' }),
    Cell: DescriptionCell,
    width: 300,
  },
  {
    id: 'status',
    Header: 'Status',
    accessor: (wo) => `${wo.status} ${wo.statusDescription}`,
  },
  {
    id: 'materialStatus',
    Header: 'Material Status',
    accessor: (wo) => `${wo.materialStatus} ${wo.materialStatusDescription}`,
  },
  {
    id: 'projectProgress',
    Header: 'Progress',
    accessor: (wo) => ({ content: wo, currentKey: 'projectProgress' }),
    Cell: ProgressCell,
  },
];
type WorkordersTabProps = {
  packages: McWorkOrder[] | undefined;
  error: Error | null;
  isFetching: boolean;
};
export const WorkordersTab = ({ packages, error, isFetching }: WorkordersTabProps) => {
  return (
    <TabTable
      columns={columns}
      packages={packages}
      isFetching={isFetching}
      error={error}
      resourceName="Workorders"
    />
  );
};
