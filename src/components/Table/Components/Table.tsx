import React, { PropsWithChildren, useCallback } from 'react';
import { Cell, Row, TableInstance, TableOptions } from 'react-table';
import { FixedSizeList as List } from 'react-window';
import { useTable } from '../Hooks/useTable';
import { TableData } from '../types';
import { useDefaultColumn } from '../Utils/ColumnDefault';
import { RegisterReactTableHooks } from '../Utils/registerReactTableHooks';
import { GroupCell } from './GoupedCell';
import { HeaderCell } from './HeaderCell';
import { Table, TableCell, TableRow } from './Styles';

interface DataTableProps<TData extends TableData> {
    options: TableOptions<TData>;
    FilterComponent?: React.FC<{ filterId: string }>;
}

const topBarHeight = 64;
const itemSize = 35;

export function DataTable<T extends TableData = TableData>({
    options,
    FilterComponent,
}: PropsWithChildren<DataTableProps<T>>): JSX.Element {
    const hooks = RegisterReactTableHooks<T>({ rowSelect: options.enableSelectRow || false });

    const defaultColumn = useDefaultColumn(options);

    const { prepareRow, rows, getTableProps, getTableBodyProps, headerGroups, totalColumnsWidth } =
        useTable({ ...options, defaultColumn }, hooks) as TableInstance<TableData>;

    const onCellClick = useCallback(
        (cell: Cell) => {
            options?.onCellClick && options.onCellClick(cell);
        },
        [options.onCellClick]
    );

    return (
        <Table {...getTableProps()}>
            <div>
                {headerGroups.map((headerGroup) => (
                    <div
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.getHeaderGroupProps().key}
                    >
                        {headerGroup.headers.map((column) => (
                            <HeaderCell
                                {...column}
                                FilterComponent={FilterComponent}
                                key={column.getHeaderProps().key}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div {...getTableBodyProps()}>
                <List
                    height={800 - topBarHeight}
                    itemCount={rows.length}
                    width={totalColumnsWidth + 10}
                    itemSize={itemSize}
                    itemData={{ rows, prepareRow, onCellClick, setSelected: options?.setSelected }}
                >
                    {RenderRow}
                </List>
            </div>
        </Table>
    );
}
interface RenderRowData {
    rows: Row<TableData>[];
    prepareRow: (row: Row<TableData>) => void;
    onCellClick: (cell: Cell) => void;
    setSelected?: (item: any) => void;
}
interface RenderRowProps {
    data: RenderRowData;
    index: number;
    style: any;
}
const RenderRow = ({ data, index, style }: RenderRowProps): JSX.Element | null => {
    const row = data.rows[index];
    if (!row) return null;
    data.prepareRow(row);

    const handleClick = useCallback(() => {
        data.setSelected && data.setSelected(row.values['tagNo']);
    }, [data.setSelected, row]);

    return (
        <TableRow {...row.getRowProps({ style })} onClick={handleClick}>
            {row.cells.map((cell: Cell) => {
                return (
                    <TableCell
                        align={cell.column.align}
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                        // onClick={() => data.onCellClick(cell)}
                    >
                        {cell.isGrouped ? (
                            <GroupCell row={row} cell={cell} />
                        ) : cell.isAggregated && cell.value ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : (
                            // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render('Cell')
                        )}
                        <></>
                    </TableCell>
                );
            })}
        </TableRow>
    );
};
