import { Column } from '@equinor/Table';

export function generateColumn<T>(
    headerName: string,
    render: (wo: T) => string | number | JSX.Element | Date | null | undefined,
    width: number
): Column<any> {
    return {
        Header: headerName,
        accessor: headerName,
        width: width,
        Cell: ({ cell }: any) => render(cell.row.original),
    };
}
