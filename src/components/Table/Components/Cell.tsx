import { Hooks } from "react-table";
import { RowCheckbox } from "./Styles";


export function useSelector<T>(hooks: Hooks<Record<string, T>>): void {
    hooks.visibleColumns.push((columns) => [
        {
            id: 'selection',
            disableResizing: true,
            disableGroupBy: true,
            minWidth: 50,
            width: 50,
            maxWidth: 50,
            // Header: ({ getToggleAllPageRowsSelectedProps }: UseRowSelectInstanceProps<Record<string, unknown>>): JSX.Element => (
            //     <HeaderCheckbox  {...getToggleAllPageRowsSelectedProps()} />
            // ),
            Cell: ({ row }): JSX.Element => row.original?.noCheckbox ? <></> : <RowCheckbox disabled={row.original?.disableCheckbox} {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
    ]);
};