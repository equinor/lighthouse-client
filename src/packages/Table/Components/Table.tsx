import { tokens } from '@equinor/eds-tokens';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { Cell, Column, Row, TableInstance, TableOptions } from 'react-table';
import { FixedSizeList as List } from 'react-window';

import { useTable } from '../Hooks/useTable';
import { SelectedRowCallback, TableAPI } from '../Types';
import { CellClickHandler, TableData } from '../Types/types';
import { useDefaultColumn } from '../Utils/ColumnDefault';
import { RegisterReactTableHooks } from '../Utils/registerReactTableHooks';
import { GroupCell } from './GoupedCell';
import { HeaderCell } from './HeaderCell';
import { Table as TableWrapper, TableCell, TableRow } from './Styles';

type DataTableProps<TData extends TableData> = {
    options?: Partial<TableOptions<TData>>;
    data: TData[];
    columns: Column<TData>[];
    height?: number;
    itemSize?: number;
    onTableReady?: (getApi: () => TableAPI) => void;
};

const DEFAULT_HEIGHT = 600;
const DEFAULT_ITEM_SIZE = 35;

export function Table<TData extends TableData = TableData>({
    options,
    data,
    columns: dataColumns,
    itemSize,
    height,
    onTableReady,
}: PropsWithChildren<DataTableProps<TData>>): JSX.Element {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const hooks = RegisterReactTableHooks<TData>({
        rowSelect: (options && options.enableSelectRows) || false,
    });
    const defaultColumn = useDefaultColumn({
        data: data,
        columns: dataColumns,
        ...(options ?? {}),
    });

    const {
        prepareRow,
        rows,
        toggleHideColumn,
        visibleColumns,
        getTableProps,
        allColumns,
        getTableBodyProps,
        headerGroups,
        totalColumnsWidth,
        setColumnOrder,
    } = useTable(
        { ...(options ?? {}), columns: dataColumns, defaultColumn, data },
        hooks
    ) as TableInstance<TableData>;

    const getVisibleColumns = useCallback(() => visibleColumns, [visibleColumns]);
    const getTableApi = useCallback((): TableAPI => {
        return {
            getHeaderGroups: () => headerGroups,
            getVisibleColumns,
            getHiddenColumns: () => allColumns.filter((col) => !col.isVisible).map((col) => col.id),
            setColumnOrder,
            toggleHideColumn,
            getSelectedRowId: () => selectedId,
            setSelectedRowId: (callbackOrId: SelectedRowCallback | string) =>
                setSelectedId(typeof callbackOrId === 'string' ? callbackOrId : callbackOrId(rows)),
            getColumns: () => allColumns,
            getRows: () => rows,
        };
    }, [
        allColumns,
        getVisibleColumns,
        headerGroups,
        rows,
        selectedId,
        setColumnOrder,
        toggleHideColumn,
    ]);

    const onCellClick: CellClickHandler<TableData> = useCallback(
        (cell, e) => {
            options?.onCellClick && options.onCellClick(cell, e);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [options?.onCellClick]
    );

    useLayoutEffect(() => {
        options?.columnOrder && setColumnOrder(options.columnOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options?.columnOrder]);

    useEffect(() => {
        onTableReady && onTableReady(getTableApi);
    }, [getTableApi, onTableReady]);
    return (
        <TableWrapper {...getTableProps()}>
            <div>
                {headerGroups.map((headerGroup) => (
                    <div
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.getHeaderGroupProps().key}
                    >
                        {headerGroup.headers.map((column) => (
                            <HeaderCell {...column} key={column.getHeaderProps().key} />
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
    const handleClick = useCallback(() => {
        if (row.isGrouped) {
            return;
        }
        data?.onSelect && data.onSelect(row.original, row.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.onSelect, row]);

    if (!row) return null;

    data.prepareRow(row);

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
                            ) : cell.isAggregated &&
                              cell.value ? null : cell.isPlaceholder ? null : ( // If the cell is aggregated, blank field expect the grouped one
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
