import { useMemo } from 'react';
import { useFlexLayout, useGroupBy, useTable } from 'react-table';
import { useColumns } from './Hooks/useColumns';
import { useTableDefaults } from './Hooks/useTableDefaults';
import {
    TableCell,
    TableFooter,
    TableFooterRow,
    TableHeadCell,
    TableHeader,
    TableRow,
    TableRows,
    TableVisualWrapper,
    TableWrapper,
    TypeChip,
    TypeWrapper
} from './Styles/Table';
import { Table } from './Types/table';
import { TableVisualOptions } from './Types/tableVisualOptions';

interface TableVisualProps<T extends Record<string, unknown>> {
    data: T[];
    options: TableVisualOptions<T>;
}
/**
 * Table Visual - a grouped table 
 * Use if you want to show a table with specified columns, that needs computation or special look. 
 * 
 * @param data dataset for the table. 
 * @param options Table configuration. 
 * @param initialGroupBy column to group the table by initially. 
 * @param groupBy Array off columns that can be selected as group by. 
 * @param columns configuration for columns to display. If omitted all fields in data is displayed
 * @param styles override or change style of the Table 
 * @returns Grouped tabled based on data and options. Built with React Table
 * @example  
 *     
 *   <TableVisual<Package>
            data={data}
            options={{
                initialGroupBy: 'PackageField',
                groupBy,
                columns,
            }}
        />


 */
export function TableVisual<T extends Record<string, unknown>>({
    data,
    options,
}: TableVisualProps<T>): JSX.Element {
    const { initialState, defaultColumn } = useTableDefaults(options.initialGroupBy.toString());

    const columns = useColumns<T>(data[0], options?.columns);
    const tableState = useMemo(() => data, [data]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        setGroupBy,
        state,
    } = useTable<T>(
        {
            columns: columns,
            data: tableState,
            defaultColumn,
            initialState,
        },
        useFlexLayout,
        useGroupBy
    ) as Table;

    const { styles } = options;

    // console.log(rows, headerGroups);

    return (
        <TableVisualWrapper>
            <TypeWrapper>
                {options?.groupBy?.map((groupBy) => (
                    <TypeChip
                        key={groupBy.key.toString()}
                        onClick={() => setGroupBy([groupBy.key.toString()])}
                        variant={
                            (state as any)?.groupBy.includes(groupBy.key.toString())
                                ? 'active'
                                : 'default'
                        }
                    >
                        {groupBy?.title || groupBy.key}
                    </TypeChip>
                ))}
            </TypeWrapper>
            <TableWrapper {...getTableProps({ style: { ...styles?.table } })}>
                <TableHeader style={{ ...(styles?.tableHeader || {}) }}>
                    {headerGroups.map((group) => {
                        const { style, key } = group.getHeaderGroupProps({
                            style: { ...(styles?.tableRow || {}) },
                        });

                        return (
                            <div style={style} key={key}>
                                {group.headers.map((column) => (
                                    <TableHeadCell
                                        {...column.getHeaderProps()}
                                        key={column.getHeaderProps().key}
                                    >
                                        {column.render('Header')}
                                    </TableHeadCell>
                                ))}
                            </div>
                        );
                    })}
                </TableHeader>
                <TableRows {...getTableBodyProps({ style: { ...styles?.tableRows } })}>
                    {rows.map((row) => {
                        prepareRow(row);
                        const { style, key } = row.getRowProps({
                            style: { ...(styles?.tableRow || {}) },
                        });

                        return (
                            <TableRow style={style} key={key}>
                                {row.cells.map((cell: any) => {
                                    if (cell.isAggregated) {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render('Aggregated')}
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        );
                    })}
                </TableRows>
                <TableFooter style={{ ...styles?.tableFooter }}>
                    {footerGroups.map((group) => {
                        const { key, style } = group.getFooterGroupProps({
                            style: { ...styles?.tableFooterRow },
                        });

                        return (
                            <TableFooterRow style={style} key={key}>
                                {group.headers.map((column) => (
                                    <TableCell
                                        {...column.getFooterProps()}
                                        key={column.getFooterProps().key}
                                    >
                                        {column.render('Footer')}
                                    </TableCell>
                                ))}
                            </TableFooterRow>
                        );
                    })}
                </TableFooter>
            </TableWrapper>
        </TableVisualWrapper>
    );
}
