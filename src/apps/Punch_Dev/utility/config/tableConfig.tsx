import { TableOptions } from '@equinor/WorkSpace';
import { Punch } from '../../types/punch';
import {
    CellProps,
    CustomColumn,
    CustomDescriptionCell,
    CustomLinkCellWithTextDecoration,
    EstimateBar,
    StatusCustomCell,
} from '@equinor/Table';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { statusColorMap } from '@equinor/GardenUtils';
import { Atom, deref, swap } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
const estimateHoursMaxAtom = Atom.of<number>(-1);
const customColumns: CustomColumn<Punch>[] = [
    {
        id: 'punchItemNo',
        Header: 'Punch no',
        accessor: (pkg) => pkg.punchItemNo,
        Cell: (cellProps) => {
            return (
                <CustomLinkCellWithTextDecoration
                    contentToBeDisplayed={cellProps.value}
                    url={proCoSysUrls.getPunchUrl(cellProps.value)}
                />
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },

    {
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
        Cell: (cellProps) => {
            return <CustomDescriptionCell description={cellProps.value} />;
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 300,
    },
    {
        id: 'punchListSorting',
        Header: 'Sorting',
        accessor: (pkg) => pkg.punchListSorting,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Compkg',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'commissioningPackageNo',
            url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageId || ''),
        }),
        Cell: (cellProps) => {
            return (
                <CustomLinkCellWithTextDecoration
                    contentToBeDisplayed={cellProps.value.content.commissioningPackageNo}
                    url={cellProps.value.url}
                />
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'tagNo',
        Header: 'Tag no',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'tagNo',
            url: proCoSysUrls.getTagUrl(pkg.tagId || ''),
        }),
        Cell: (cellProps) => {
            return (
                <CustomLinkCellWithTextDecoration
                    contentToBeDisplayed={cellProps.value.content.tagNo}
                    url={cellProps.value.url}
                />
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'formularType',
        Header: 'Form type',
        accessor: (pkg) => pkg.formularType,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },

    {
        id: 'punchItemCateogry',
        Header: 'Category',
        accessor: (pkg) => pkg.punchItemCategory,
        Cell: (cellProps) => (
            <StatusCustomCell
                contentToBeDisplayed={cellProps.value}
                cellAttributeFunction={() => ({
                    style: { backgroundColor: statusColorMap[cellProps.value] },
                })}
            />
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (pkg) => (pkg.clearedAtDate ? 'Closed' : 'Open'),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'clearedAtDate',
        Header: 'Cleared',
        accessor: (pkg) => pkg.clearedAtDate,
        Cell: (cellProps) => {
            if (!cellProps.value) {
                return null;
            }

            return new Date(cellProps.value).toLocaleDateString();
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'verifiedAtDate',
        Header: 'Verified',
        accessor: (pkg) => pkg.verifiedAtDate,
        Cell: (cellProps) => {
            if (!cellProps.value) {
                return null;
            }

            return new Date(cellProps.value).toLocaleDateString();
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'raisedByOrganization',
        Header: 'Raised by',
        accessor: (pkg) => pkg.raisedByOrganization,
        width: 150,
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'clearingByOrganization',
        Header: 'Clearing by org',
        accessor: (pkg) => pkg.clearingByOrganization,
        width: 150,
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'workOrderNo',
        Header: 'WO',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'workOrderNo',
            url: proCoSysUrls.getWorkOrderUrl(pkg.workOrderId || ''),
        }),
        Cell: (cellProps) => {
            return (
                <CustomLinkCellWithTextDecoration
                    contentToBeDisplayed={cellProps.value.content.workOrderNo}
                    url={cellProps.value.url}
                />
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },

    {
        id: 'dueDate',
        Header: 'Due date',
        accessor: (pkg) => pkg.dueDate,
        Cell: (cellProps) => {
            if (!cellProps.value) {
                return null;
            }

            return new Date(cellProps.value).toLocaleDateString();
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'materialEstimatedTimeOfArrival',
        Header: 'Mat ref',
        accessor: (pkg) => pkg.materialEstimatedTimeOfArrival,
        Cell: (cellProps) => {
            if (!cellProps.value) {
                return null;
            }

            return new Date(cellProps.value).toLocaleDateString();
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'materialRequired',
        Header: 'Mat req',
        accessor: (pkg) => pkg.materialRequired,
        Cell: (cellProps) => {
            if (cellProps.value === null) {
                return null;
            }

            return <Icon name={cellProps.value ? 'check' : 'clear'} size={16} />;
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 80,
    },

    {
        id: 'c01ForecastDate',
        Header: 'RFC Forecast/Planned',
        accessor: (pkg) => pkg.c01ForecastDate ?? pkg.c01PlannedDate,
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
        Cell: (cellProps) => {
            return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
        },
    },
    {
        id: 'c07ForecastDate',
        Header: 'RFO Forecast/Planned',
        accessor: (pkg) => pkg.c07ForecastDate ?? pkg.c07PlannedDate,
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
        Cell: (cellProps) => {
            return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
        },
    },

    {
        id: 'priority1',
        Header: 'Priority',
        accessor: (pkg) => pkg.priority1,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },

    {
        id: 'estimate',
        Header: 'Estimate',
        accessor: (pkg) => pkg.estimate,
        Cell: (cellProps: CellProps<Punch>) => {
            if (deref(estimateHoursMaxAtom) === -1) {
                const a = cellProps.cell.column.filteredRows;
                const maxCount = a.reduce((acc, curr) => {
                    const estimate = curr.original.estimate as number;

                    return estimate > acc ? estimate : acc;
                }, 0);

                swap(estimateHoursMaxAtom, () => maxCount);
            }

            const highestEstimatedHours = deref(estimateHoursMaxAtom);

            return <EstimateBar current={Number(cellProps.value)} max={highestEstimatedHours} />;
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
];
export const tableConfig: TableOptions<Punch> = {
    objectIdentifierKey: 'punchItemNo',
    preventAutoGenerateColumns: true,
    customColumns,
};
