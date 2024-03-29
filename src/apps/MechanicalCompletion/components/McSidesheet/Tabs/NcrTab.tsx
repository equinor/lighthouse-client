import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Column } from '@equinor/Table';
import { McNcr } from '../types';

export type NcrTabProps = {
  packages: McNcr[] | undefined;
  isFetching: boolean;
  error: Error | null;
};

const columns: Column<McNcr>[] = [
  {
    id: 'documentNumber',
    Header: 'Doc.no',
    accessor: (pkg) => ({
      url: isProduction() ? pkg.url : pkg.url.replace('procosys', 'procosystest'),
      content: pkg,
      currentKey: 'documentNumber',
    }),
    Cell: CellWithLink,
    width: 100,
  },
  {
    id: 'title',
    Header: 'Title',
    accessor: (ncr) => ncr.title,
    width: 600,
  },
];
export const NcrTab = ({ packages, error, isFetching }: NcrTabProps) => {
  return (
    <TabTable
      columns={columns}
      packages={packages}
      isFetching={isFetching}
      error={error}
      resourceName="NCr"
    />
  );
};
