import { tokens } from '@equinor/eds-tokens';
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
import { TableConfigBar } from './TableConfigBar/TableConfigBar';

//Feel free to extend

export type SelectedRowCallback = (rows: Row<TableData>[]) => string | null;
export interface TableAPI {
    toggleHideColumn: (colId: string) => void;
    setColumnOrder: (updater: string[] | ((columnOrder: string[]) => string[])) => void;
    getVisibleColumns: () => ColumnInstance<TableData, TableData>[];
    getHeaderGroups: () => HeaderGroup<TableData>[];
    getSelectedRowId: () => string | null;
    setSelectedRowId: (callbackOrId: SelectedRowCallback | string) => void;
    getColumns: () => ColumnInstance<TableData, TableData>[];
}

interface DataTableProps<TData extends TableData> {
    options: TableOptions<TData>;
    FilterComponent?: React.FC<{ filterId: string }>;
    height?: number;
    itemSize?: number;
    onTableReady?: (getApi: () => TableAPI) => void;
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
        columns,
        getTableBodyProps,
        headerGroups,
        totalColumnsWidth,
        setColumnOrder,
    } = useTable({ ...options, defaultColumn }, hooks) as TableInstance<TableData>;

    const getVisibleColumns = () => visibleColumns;

    const getTableApi = (): TableAPI => ({
        getHeaderGroups: () => headerGroups,
        getVisibleColumns,
        setColumnOrder,
        toggleHideColumn,
        getSelectedRowId: () => selectedId,
        setSelectedRowId: (callbackOrId: SelectedRowCallback | string) =>
            setSelectedId(typeof callbackOrId === 'string' ? callbackOrId : callbackOrId(rows)),
        getColumns: () => columns,
    });

    useEffect(() => {
        onTableReady && onTableReady(getTableApi);
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
            <TableConfigBar getTableApi={getTableApi} />
            <div>
                {headerGroups.map((headerGroup) => (
                    <div
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.getHeaderGroupProps().key}
                    >
                        {headerGroup.headers.map((column) => (
                            <span
                                key={column.getHeaderProps().key}
                                onClick={() => column.toggleSortBy()}
                            >
                                <HeaderCell
                                    {...column}
                                    FilterComponent={FilterComponent}
                                    key={column.getHeaderProps().key}
                                />
                            </span>
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
    onSelect?: (item: TableData, index: string) => void;
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
        data?.onSelect && data.onSelect(row.original, row.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.onSelect, row]);

    data.selectedId === row.id &&
        (style = {
            ...style,
            backgroundColor: tokens.colors.interactive.primary__selected_highlight.hex,
        });

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
