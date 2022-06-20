import { TableOptions } from '@equinor/WorkSpace';
import { Punch } from '../../types/punch';

export const tableConfig: TableOptions<Punch> = {
    objectIdentifierKey: 'punchItemNo',
    preventAutoGenerateColumns: true,

    customColumns: [
        {
            id: 'punchItemNo',
            Header: 'Punch',
            accessor: (pkg) => pkg.punchItemNo,
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
        },
        {
            id: 'punchItemCateogry',
            Header: 'Category',
            accessor: (pkg) => pkg.punchItemCategory,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
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
            id: 'formularType',
            Header: 'Form type',
            accessor: (pkg) => pkg.formularType,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
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
            id: 'punchListSorting',
            Header: 'PL Sorting',
            accessor: (pkg) => pkg.punchListSorting,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
        {
            id: 'punchListType',
            Header: 'PL Type',
            accessor: (pkg) => pkg.punchListType,
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
    ],
};
