import React, { PropsWithChildren } from 'react';
import { TableOptions, useTable } from 'react-table';
import { FixedSizeList as List } from 'react-window';
import { RegisterReactTableHooks } from '../Utils/registerReactTableHooks';
import { GroupCell } from './GoupedCell';
import { HeaderCell } from './HeaderCell';
import { Table, TableCell, TableRow } from './Styles';

interface DataTableProps<T extends Record<string, unknown>> extends TableOptions<T> {
    data: T[];
    onSelectedChange?: (args: T[], ids: Record<string, boolean>) => void;
    setSelected?: (itemId: string) => void;
    selectedRows?: Record<string, boolean>;
    FilterComponent?: React.FC<{ filterId: string }>;
}

const topBarHeight = 64;
const itemSize = 35;

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    FilterComponent,
    setSelected,
}: PropsWithChildren<DataTableProps<Record<string, T>>>): JSX.Element {
    const hooks = RegisterReactTableHooks<T>();

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 500,
        }),
        []
    );

    const {
        prepareRow,
        rows,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        totalColumnsWidth,
    }: any = useTable<Record<string, T>>({ columns, data, defaultColumn }, ...hooks);

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
                    itemData={{ rows, prepareRow, setSelected }}
                >
                    {RenderRow}
                </List>
            </div>
        </Table>
    );
}

interface RenderRowProps {
    data: any;
    index: number;
    style: any;
}

const RenderRow = ({ data, index, style }: RenderRowProps): JSX.Element | null => {
    const row = data.rows[index];
    if (!row) return null;
    data.prepareRow(row);

    const handleClick = () => {
        data.setSelected && data.setSelected(row.values['tagNo']);
    };

    return (
        <TableRow {...row.getRowProps({ style })} onClick={handleClick}>
            {row.cells.map((cell) => {
                return (
                    <TableCell
                        align={cell.column.align}
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
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
