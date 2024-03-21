import { TableOptions } from '@equinor/WorkSpace';
import {
  getPossibleWarranty,
  getScheduleImpact,
  getSignatureProgress,
} from '../helpers/queryItemMapping';
import {
  CellProps,
  CustomProgressCell,
  CustomDescriptionCell,
  CustomLinkCellWithTextDecoration,
} from '@equinor/Table';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { Query } from '../../types';
export const tableConfig: TableOptions<Query> = {
  objectIdentifierKey: 'queryUrlId',
  preventAutoGenerateColumns: true,

  customColumns: [
    {
      id: 'queryNo',
      Header: 'Query',
      accessor: (pkg) => ({
        content: pkg,
        currentKey: 'queryNo',
        url: proCoSysUrls.getQueryUrl(pkg.queryUrlId ?? ''),
      }),
      Aggregated: () => null,
      aggregate: 'count',
      width: 150,
      Cell: (cellProps) => {
        return (
          <CustomLinkCellWithTextDecoration
            contentToBeDisplayed={cellProps.value.content.queryNo}
            url={cellProps.value.url}
          />
        );
      },
    },
    {
      id: 'title',
      Header: 'Title',
      accessor: (pkg) => pkg.title,
      Aggregated: () => null,
      aggregate: 'count',
      width: 250,
      Cell: (cellProps) => {
        return <CustomDescriptionCell description={cellProps.value} />;
      },
    },
    {
      id: 'queryStatus',
      Header: 'Status',
      accessor: (pkg) => pkg.queryStatus,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
    },
    {
      id: 'queryType',
      Header: 'Type',
      accessor: (pkg) => pkg.queryType,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
    },
    {
      id: 'milestone',
      Header: 'Milestone',
      accessor: (pkg) => pkg.milestone,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
    },
    {
      id: 'nextToSign',
      Header: 'Next to sign',
      accessor: (pkg) => pkg.nextToSign,
      Aggregated: () => null,
      aggregate: 'count',
      width: 300,
      Cell: (cellProps) => {
        return <CustomDescriptionCell description={cellProps.value} />;
      },
    },
    {
      id: 'disciplineDescription',
      Header: 'Discipline',
      accessor: (pkg) => pkg.disciplineDescription,
      Aggregated: () => null,
      aggregate: 'count',
      width: 250,
    },
    {
      id: 'requiredAtDate',
      Header: 'Required date',
      accessor: (pkg) => pkg.requiredReplyDate,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
      Cell: (cellProps) => {
        return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
      },
    },
    {
      id: 'closedDate',
      Header: 'Closed date',
      accessor: (pkg) => pkg.closedDate,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
      Cell: (cellProps) => {
        return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
      },
    },
    {
      id: 'signatureProgress',
      Header: 'Signature progress',
      accessor: (pkg) => getSignatureProgress(pkg),
      Aggregated: () => null,
      aggregate: 'count',
      width: 150,
      Cell: (cellProps: CellProps<Query>) => {
        if (!cellProps.value || Number(cellProps.value) === 0) {
          return null;
        }

        return <CustomProgressCell progress={cellProps.value} />;
      },
    },
    {
      id: 'getPossibleWarranty',
      Header: 'Possible warranty claim',
      accessor: (pkg) => getPossibleWarranty(pkg),
      Aggregated: () => null,
      aggregate: 'count',
      width: 150,
    },
    {
      id: 'getScheduleImpact',
      Header: 'Schedule impact',
      accessor: (pkg) => getScheduleImpact(pkg),
      Aggregated: () => null,
      aggregate: 'count',
      width: 150,
    },
    {
      id: 'consequenceIfNotImplemented',
      Header: 'Consequence if not implemented',
      accessor: (pkg) => pkg.consequenceIfNotImplemented,
      Aggregated: () => null,
      aggregate: 'count',
      width: 250,
      Cell: (cellProps) => {
        return <CustomDescriptionCell description={cellProps.value} />;
      },
    },
    {
      id: 'proposedSolution',
      Header: 'Proposed solution',
      accessor: (pkg) => pkg.proposedSolution,
      Aggregated: () => null,
      aggregate: 'count',
      width: 250,
      Cell: (cellProps) => {
        return <CustomDescriptionCell description={cellProps.value} />;
      },
    },
    {
      id: 'engineeringReply',
      Header: 'Engineering Reply',
      accessor: (pkg) => pkg.engineeringReply,
      Aggregated: () => null,
      aggregate: 'count',
      width: 250,
      Cell: (cellProps) => {
        return <CustomDescriptionCell description={cellProps.value} />;
      },
    },
    {
      id: 'daysToClose',
      Header: 'Days to close',
      accessor: (pkg) => pkg.daysToClose,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
    },
    {
      id: 'updatedDate',
      Header: 'Last update',
      accessor: (pkg) => pkg.updatedDate,
      Aggregated: () => null,
      aggregate: 'count',
      width: 100,
      Cell: (cellProps) => {
        return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
      },
    },
  ],
};
