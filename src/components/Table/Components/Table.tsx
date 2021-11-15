import { Tooltip } from '@equinor/eds-core-react';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { Cell, TableOptions, useTable } from 'react-table';
import { FixedSizeList as List } from 'react-window';
import { RegisterReactTableHooks } from '../Utils/registerReactTableHooks';
import { GroupCell } from './GoupedCell';
import { HeaderCell } from './HeaderCell';
import { Table, TableCell, TableRow } from "./Styles";


interface DataTableProps<T extends Record<string, unknown>> extends TableOptions<T> {
    data: T[],
    onSelectedChange?: (args: T[], ids: Record<string, boolean>) => void;
    selectedRows?: Record<string, boolean>;
    FilterComponent?: React.FC<{ filterId: string }>
}

const topBarHeight = 64;
const itemSize = 35;

export function DataTable<T extends Object>({ data, columns, FilterComponent }: PropsWithChildren<DataTableProps<Record<string, T>>>) {

    const hooks = RegisterReactTableHooks<T>();



    const test = useMemo(() => (row): JSX.Element => {
        const cell = row.cell
        return (
            <Tooltip title={cell.value || ''} enterDelay={200}>
                <div >
                    {cell.value}
                </div>
            </Tooltip >
        );
    }, []);


    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 500,
        }),
        []
    )

    const {
        prepareRow,
        rows,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        totalColumnsWidth,
        selectedFlatRows,
        setPageSize
    }: any = useTable<Record<string, T>>({ columns, data, defaultColumn }, ...hooks)


    const cellClickHandler = (cell: Cell<Record<string, unknown>>) => (): void => {
        // data.onClick && cell.column.id !== 'selection' && data.onClick(cell.row);
    };

    useEffect(() => {
        // selectedFlatRows && console.log(selectedFlatRows)
    }, [selectedFlatRows])


    return (
        <Table {...getTableProps()}>
            <div>
                {headerGroups.map(headerGroup => (
                    <div {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <HeaderCell {...column} FilterComponent={FilterComponent} />
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
                    itemData={{ rows, prepareRow }}
                >
                    {RenderRow}
                </List>
            </div>
        </Table>
    );
}


const RenderRow = ({ data, index, style }): JSX.Element | null => {
    const row = data.rows[index];
    if (!row) return null;
    data.prepareRow(row);

    return (

        <TableRow  {...row.getRowProps({ style })}>
            {row.cells.map((cell) => {

                return (
                    <TableCell align={cell.column.align} {...cell.getCellProps()} key={cell.getCellProps().key} onClick={() => { }}>
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
                )
            }
            )}
        </TableRow>
    );


};