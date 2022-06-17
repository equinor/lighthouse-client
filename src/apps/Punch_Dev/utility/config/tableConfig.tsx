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
            id: 'checklistId',
            Header: 'Checklist',
            accessor: (pkg) => pkg.checklistId,
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
            width: 300,
        },
        {
            id: 'estimate',
            Header: 'Estimate',
            accessor: (pkg) => pkg.estimate,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
    ],
};
