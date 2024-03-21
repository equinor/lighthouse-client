import { Atom, deref, swap } from '@dbeining/react-atom';
import { statusColorMap } from '@equinor/GardenUtils';
import { proCoSysUrls } from '@equinor/procosys-urls';
import {
  CustomColumn,
  CustomLinkCellWithTextDecoration,
  EstimateBar,
  StatusCustomCell,
} from '@equinor/Table';
import { TableOptions } from '@equinor/WorkSpace';
import { Loop } from '../../types/loop';
const remainingHoursMaxAtom = Atom.of<number>(-1);
const customColumns: CustomColumn<Loop>[] = [
  {
    id: 'loopTag',
    Header: 'Loop tag',
    accessor: (pkg) => pkg.loopNo,
    width: 200,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'description',
    Header: 'Description',
    accessor: (pkg) => pkg.description,
    width: 350,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'functionalSystem',
    Header: 'System',
    accessor: (pkg) => pkg.functionalSystem,
    width: 80,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'commissioningPackageNo',
    Header: 'Comm pkg',
    accessor: (pkg) => ({
      content: pkg,
      currentKey: 'commissioningPackageNo',
      url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageUrlId || ''),
    }),
    Cell: (cellProps) => {
      return (
        <CustomLinkCellWithTextDecoration
          contentToBeDisplayed={cellProps.value.content.commissioningPackageNo}
          url={cellProps.value.url}
        />
      );
    },
    width: 90,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'mechanicalCompletionPackageNo',
    Header: 'MC pkg',
    accessor: (pkg) => ({
      content: pkg,
      currentKey: 'mechanicalCompletionPackageNo',
      url: proCoSysUrls.getMcUrl(pkg.mechanicalCompletionPackageUrlId || ''),
    }),
    Cell: (cellProps) => {
      return (
        <CustomLinkCellWithTextDecoration
          contentToBeDisplayed={cellProps.value.content.mechanicalCompletionPackageNo}
          url={cellProps.value.url}
        />
      );
    },
    width: 80,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'priority1',
    Header: 'Priority',
    accessor: (pkg) => pkg.priority1,
    width: 80,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'rfC_Planned_Forecast_Date',
    Header: 'Planned/Forecast RFC',
    accessor: (pkg) => pkg.rfC_Planned_Forecast_Date,
    Cell: (cellProps) => (
      <>{cellProps.value ? new Date(cellProps.value).toLocaleDateString() : ''}</>
    ),
    width: 160,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'rfO_Planned_Forecast_Date',
    Header: 'Planned/Forecast RFO',
    accessor: (pkg) => pkg.rfO_Planned_Forecast_Date,
    Cell: (cellProps) => (
      <>{cellProps.value ? new Date(cellProps.value).toLocaleDateString() : ''}</>
    ),
    width: 160,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'status',
    Header: 'Checklist status',
    accessor: (pkg) => pkg.status,
    Cell: (cellProps) => (
      <StatusCustomCell
        contentToBeDisplayed={cellProps.value}
        cellAttributeFunction={() => ({
          style: { backgroundColor: statusColorMap?.[cellProps.value] || 'transparent' },
        })}
      />
    ),
    width: 120,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'responsible',
    Header: 'Responsible',
    accessor: (pkg) => pkg.responsible,
    width: 100,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'location',
    Header: 'Location',
    accessor: (pkg) => pkg.location,
    width: 100,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'formularType',
    Header: 'Form type',
    accessor: (pkg) => pkg.formularType,
    width: 100,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'signedDate',
    Header: 'Signed',
    accessor: (pkg) => pkg.signedDate,
    Cell: (cellProps) => (
      <>{cellProps.value ? new Date(cellProps.value).toLocaleDateString() : ''}</>
    ),
    width: 100,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'verifiedDate',
    Header: 'Verified',
    accessor: (pkg) => pkg.verifiedDate,
    Cell: (cellProps) => (
      <>{cellProps.value ? new Date(cellProps.value).toLocaleDateString() : ''}</>
    ),
    width: 100,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'loopContentStatus',
    Header: 'Content MC status',
    accessor: (pkg) => pkg.loopContentStatus,
    Cell: (cellProps) => (
      <StatusCustomCell
        contentToBeDisplayed={cellProps.value}
        cellAttributeFunction={() => ({
          style: { backgroundColor: statusColorMap?.[cellProps.value] || 'transparent' },
        })}
      />
    ),
    width: 150,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'plannedCompletionDate',
    Header: 'Planned MC complete',
    accessor: (pkg) => pkg.woPlannedCompletionDate,
    Cell: (cellProps) => (
      <>{cellProps.value ? new Date(cellProps.value).toLocaleDateString() : ''}</>
    ),
    width: 150,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'actualCompletionDate',
    Header: 'Actual MC complete',
    accessor: (pkg) => pkg.woActualCompletionDate,
    Cell: (cellProps) => (
      <>{cellProps.value ? new Date(cellProps.value).toLocaleDateString() : ''}</>
    ),
    width: 150,
    Aggregated: () => null,
    aggregate: 'count',
  },
  {
    id: 'remaningManHours',
    Header: 'Rem mhrs',
    accessor: (pkg) => pkg.remainingManHours,
    Cell: (cellProps) => {
      if (deref(remainingHoursMaxAtom) === -1) {
        const maxCount = Math.max(
          ...cellProps.cell.column.filteredRows.map((val) =>
            Number(val.original?.remainingManHours)
          )
        );
        swap(remainingHoursMaxAtom, () => maxCount);
      }

      const highestRemaining = deref(remainingHoursMaxAtom);

      return <EstimateBar current={Number(cellProps.value)} max={highestRemaining} />;
    },

    width: 100,
    Aggregated: () => null,
    aggregate: 'count',
  },
];
export const tableConfig: TableOptions<Loop> = {
  objectIdentifierKey: 'checklistUrlId',
  itemSize: 32,
  customColumns,
  preventAutoGenerateColumns: true,
};
