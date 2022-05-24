import React, { PropsWithChildren, useCallback, useLayoutEffect, useRef } from 'react';
import { Cell, Row, TableInstance, TableOptions } from 'react-table';
import { FixedSizeList as List } from 'react-window';

import { useTable } from '../Hooks/useTable';
import { CellClickHandler, TableData } from '../types';
import { useDefaultColumn } from '../Utils/ColumnDefault';
import { RegisterReactTableHooks } from '../Utils/registerReactTableHooks';
import { GroupCell } from './GoupedCell';
import { HeaderCell } from './HeaderCell';
import { Table as TableWrapper, TableCell, TableRow } from './Styles';

interface DataTableProps<TData extends TableData> {
    options: TableOptions<TData>;
    FilterComponent?: React.FC<{ filterId: string }>;
    height?: number;
    itemSize?: number;
}

const DEFAULT_HEIGHT = 600;
const DEFAULT_ITEM_SIZE = 35;

export function Table<TData extends TableData = TableData>({
    options,
    FilterComponent,
    itemSize,
    height,
}: PropsWithChildren<DataTableProps<TData>>): JSX.Element {
    const hooks = RegisterReactTableHooks<TData>({ rowSelect: options.enableSelectRows || false });
    const ref = useRef<HTMLDivElement>(null);
    const defaultColumn = useDefaultColumn(options);

    const {
        prepareRow,
        rows,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        totalColumnsWidth,
        setColumnOrder,
    } = useTable({ ...options, defaultColumn }, hooks) as TableInstance<TableData>;

    const onCellClick: CellClickHandler<TableData> = useCallback(
        (cell, e) => {
            options?.onCellClick && options.onCellClick(cell, e);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [options.onCellClick]
    );

    useLayoutEffect(() => {
        options?.columnOrder && setColumnOrder(options.columnOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options?.columnOrder]);

    return (
        <TableWrapper {...getTableProps()}>
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
            <div {...getTableBodyProps()} ref={ref}>
                <List
                    height={height || DEFAULT_HEIGHT}
                    itemCount={rows.length}
                    width={totalColumnsWidth + 10}
                    itemSize={itemSize || DEFAULT_ITEM_SIZE}
                    itemData={{
                        rows,
                        prepareRow,
                        onCellClick,
                        setSelected: options?.setSelected,
                        onSelect: options?.onSelect,
                    }}
                >
                    {RenderRow}
                </List>
            </div>
        </TableWrapper>
    );
}
interface RenderRowData {
    rows: Row<TableData>[];
    prepareRow: (row: Row<TableData>) => void;
    onCellClick: CellClickHandler<TableData>;
    setSelected?: (item: any) => void;
    onSelect?: (item: TableData) => void;
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleClick = useCallback(() => {
        //data.setSelected && data.setSelected(row.original);
        data?.onSelect && data.onSelect(row.original);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.onSelect, row]);

    return (
        <TableRow
            {...row.getRowProps({
                style,
            })}
            onClick={handleClick}
        >
            {row.cells.map((cell: Cell) => {
                return (
                    <TableCell
                        align={cell.column.align}
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                        onClick={(e) => data.onCellClick(cell, e)}
                    >
                        <span style={{ fontSize: '14px', width: '100%' }}>
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
                        </span>
                    </TableCell>
                );
            })}
        </TableRow>
    );
};
