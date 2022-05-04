import { Column } from '@equinor/Table';
import { WorkOrder } from '../../Types/workOrder';

export const highestEstimate = (workOrders: WorkOrder[]): number => {
    return Math.max(...workOrders.map(({ estimatedManHours }) => Number(estimatedManHours) ?? 0));
};

export const highestExpended = (workOrders: WorkOrder[]): number => {
    return Math.max(...workOrders.map(({ expendedManHours }) => Number(expendedManHours) ?? 0));
};

export function generateColumn(
    headerName: string,
    render: (wo: WorkOrder) => string | number | JSX.Element | Date | null | undefined,
    width: number
): Column<any> {
    return {
        Header: headerName,
        accessor: headerName,
        width: width,
        Cell: ({ cell }: any) => {
            return render(cell.row.original);
        },
    };
}
