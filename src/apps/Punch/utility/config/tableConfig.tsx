import { TableOptions } from '@equinor/WorkSpace';
import { Punch } from '../../types/punch';
import { proCoSysUrls } from '@equinor/procosys-urls';
import {
    CellProps,
    CustomDescriptionCell,
    CustomLinkCellWithTextDecoration,
    StatusCustomCell,
} from '@equinor/Table';
import {
    getMaterialRequired,
    getPunchCategoryColor,
    getPunchStatusColorByStatus,
} from './punchItemMapping';
export const tableConfig: TableOptions<Punch> = {
    objectIdentifierKey: 'punchItemNo',
    preventAutoGenerateColumns: true,

    customColumns: [
        {
            id: 'punchItemNo',
            Header: 'Punch',
            accessor: (pkg) => ({
                content: pkg,
                currentKey: 'punchItemNo',
                url: proCoSysUrls.getPunchUrl(pkg.punchItemNo || ''),
            }),
            Cell: (cellProps) => {
                return (
                    <CustomLinkCellWithTextDecoration
                        contentToBeDisplayed={cellProps.value.content.punchItemNo}
                        url={cellProps.value.url}
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
            Aggregated: () => null,
            aggregate: 'count',
            width: 300,
            Cell: (cellProps) => {
                return <CustomDescriptionCell description={cellProps.value} />;
            },
        },
        {
            id: 'cateogry',
            Header: 'Category',
            accessor: (pkg) => pkg.category,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cellProps: CellProps<Punch>) => {
                if (!cellProps.value) return null;
                const statusColor = getPunchCategoryColor(cellProps.value);
                return (
                    <StatusCustomCell
                        contentToBeDisplayed={cellProps.value}
                        cellAttributeFunction={() => ({
                            style: {
                                backgroundColor:
                                    cellProps.value !== '' ? statusColor : 'transparent',
                            },
                        })}
                    />
                );
            },
        },
        {
            id: 'punchStatus',
            Header: 'Status',
            accessor: (pkg) => pkg.status,
            Aggregated: () => null,
            aggregate: 'count',
            width: 150,
            Cell: (cellProps: CellProps<Punch>) => {
                if (!cellProps.value) return null;
                const statusColor = getPunchStatusColorByStatus(cellProps.value);
                return (
                    <StatusCustomCell
                        contentToBeDisplayed={cellProps.value}
                        cellAttributeFunction={() => ({
                            style: {
                                backgroundColor:
                                    cellProps.value !== '' ? statusColor : 'transparent',
                            },
                        })}
                    />
                );
            },
        },
        {
            id: 'punchSorting',
            Header: 'PL Sorting',
            accessor: (pkg) => pkg.sorting,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
        {
            id: 'punchListType',
            Header: 'PL Type',
            accessor: (pkg) => pkg.type,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
        {
            id: 'estimate',
            Header: 'Estimate',
            accessor: (pkg) => pkg.estimate,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
        {
            id: 'raisedByOrganization',
            Header: 'Raised by org',
            accessor: (pkg) => pkg.raisedBy,
            width: 150,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'clearingByOrganization',
            Header: 'Clearing by org',
            accessor: (pkg) => pkg.cleardBy,
            width: 150,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            id: 'clearedAtDate',
            Header: 'Cleared',
            accessor: (pkg) => pkg.clearedAtDate,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cellProps) => {
                return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
            },
        },
        {
            id: 'verifiedAtDate',
            Header: 'Verified',
            accessor: (pkg) => pkg.verifiedAtDate,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cellProps) => {
                return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
            },
        },
        {
            id: 'handoverPlan',
            Header: 'Handover plan',
            accessor: (pkg) => pkg.handoverPlan,
            Aggregated: () => null,
            aggregate: 'count',
            width: 110,
            Cell: (cellProps) => {
                return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
            },
        },
        {
            id: 'formularType',
            Header: 'Form type',
            accessor: (pkg) => ({
                content: pkg,
                currentKey: 'formularType',
                url: proCoSysUrls.getFormTypeUrl(pkg.checklistId || ''),
            }),
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cellProps) => {
                return (
                    <CustomLinkCellWithTextDecoration
                        contentToBeDisplayed={cellProps.value.content.formularType}
                        url={cellProps.value.url}
                    />
                );
            },
        },
        {
            id: 'tagNo',
            Header: 'Tag',
            accessor: (pkg) => ({
                content: pkg,
                currentKey: 'tagNo',
                url: proCoSysUrls.getTagUrl(pkg.tagId || ''),
            }),
            Aggregated: () => null,
            aggregate: 'count',
            width: 150,
            Cell: (cellProps) => {
                return (
                    <CustomLinkCellWithTextDecoration
                        contentToBeDisplayed={cellProps.value.content.tagNo}
                        url={cellProps.value.url}
                    />
                );
            },
        },
        {
            id: 'commissioningPackageNo',
            Header: 'Commpkg',
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
            width: 150,
        },
        {
            id: 'workOrderNo',
            Header: 'Workorder',
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
            id: 'materialRequired',
            Header: 'Material required',
            accessor: (pkg) => getMaterialRequired(pkg),
            Aggregated: () => null,
            aggregate: 'count',
            width: 120,
        },
        {
            id: 'materialEstimatedTimeOfArrival',
            Header: 'Material estimate',
            accessor: (pkg) => pkg.materialEstimatedTimeOfArrival,
            Aggregated: () => null,
            Cell: (cellProps) => {
                return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
            },
            aggregate: 'count',
            width: 150,
        },
    ],
};
