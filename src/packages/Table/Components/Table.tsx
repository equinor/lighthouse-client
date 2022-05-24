import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { Cell, ColumnInstance, HeaderGroup, Row, TableInstance, TableOptions } from 'react-table';
import { FixedSizeList as List } from 'react-window';

import { useTable } from '../Hooks/useTable';
import { CellClickHandler, TableData } from '../types';
import { useDefaultColumn } from '../Utils/ColumnDefault';
import { RegisterReactTableHooks } from '../Utils/registerReactTableHooks';
import { GroupCell } from './GoupedCell';
import { HeaderCell } from './HeaderCell';
import { Table as TableWrapper, TableCell, TableRow } from './Styles';

//Feel free to extend
export interface TableAPI {
    toggleHideColumn: (colId: string) => void;
    setColumnOrder: (updater: string[] | ((columnOrder: string[]) => string[])) => void;
    getVisibleColumns: () => ColumnInstance<TableData, TableData>[];
    getHeaderGroups: () => HeaderGroup<TableData>[];
    getSelectedRowId: () => string | null;
    setSelectedRowId: (callback: (rows: Row<TableData>[]) => string | null) => void;
}

interface DataTableProps<TData extends TableData> {
    options: TableOptions<TData>;
    FilterComponent?: React.FC<{ filterId: string }>;
    height?: number;
    itemSize?: number;
    onTableReady?: (api: TableAPI) => void;
}

const DEFAULT_HEIGHT = 600;
const DEFAULT_ITEM_SIZE = 35;

export function Table<TData extends TableData = TableData>({
    options,
    FilterComponent,
    itemSize,
    height,
    onTableReady,
}: PropsWithChildren<DataTableProps<TData>>): JSX.Element {
    const hooks = RegisterReactTableHooks<TData>({ rowSelect: options.enableSelectRows || false });
    const ref = useRef<HTMLDivElement>(null);
    const defaultColumn = useDefaultColumn(options);

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const {
        prepareRow,
        rows,
        toggleHideColumn,
        visibleColumns,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        totalColumnsWidth,
        setColumnOrder,
    } = useTable({ ...options, defaultColumn }, hooks) as TableInstance<TableData>;

    useEffect(() => {
        onTableReady &&
            onTableReady({
                getHeaderGroups: () => headerGroups,
                getVisibleColumns: () => visibleColumns,
                setColumnOrder,
                toggleHideColumn,
                getSelectedRowId: () => selectedId,
                setSelectedRowId: (callback: (rows: Row<TableData>[]) => string | null) =>
                    setSelectedId(callback(rows)),
            });
    }, []);

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
                        selectedId: selectedId,
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
    selectedId: string | null;
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

    //TODO: Fix styling
    style =
        data.selectedId === row.id
            ? { ...style, border: '0.2px solid red', boxSizing: 'border-box' }
            : style;

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
