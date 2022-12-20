import { Column } from '@equinor/Table';
import { WorkOrder } from '../../../types/FAM/workOrder';

export function generateColumn(
    headerName: string,
    render: (wo: WorkOrder) => string | number | JSX.Element | Date | null | undefined,
    width: number
): Column<any> {
    return {
        Header: headerName,
        accessor: headerName,
        width: width,
        Cell: ({ cell }: any) => render(cell.row.original),
    };
}
