import { useMemo } from 'react';
import { Column, useFlexLayout, useGroupBy, useTable } from 'react-table';
import { useColumns } from './Hooks/useColumns';
import { useTableDefaults } from './Hooks/useTableDefaults';
import {
    FooterRow,
    TableCell,
    TableHeadCell,
    TableRow,
    TableWrapper,
    TypeChip,
    TypeWrapper
} from './Styles/Table';
import { Table } from './Types/table';
import { TableVisualOptions } from './Types/tableVisualOptions';

interface TableVisualProps<T> {
    data: T[];
    options: TableVisualOptions<T>;
}

export function TableVisual<T>({ data, options }: TableVisualProps<T>): JSX.Element {
    const { initialState, defaultColumn } = useTableDefaults(options.initialGroup.toString());

    const columns = useColumns<T>(data[0]) as readonly Column<Record<string, unknown>>[];
    const tableSate = useMemo(() => data as Record<string, unknown>[], [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        setGroupBy,
    } = useTable<Record<string, unknown>>(
        {
            columns,
            data: tableSate,
            defaultColumn,
            initialState,
        },
        useFlexLayout,
        useGroupBy
    ) as Table;

    return (
        <>
            <TypeWrapper>
                <TypeChip onClick={() => setGroupBy(['phase'])}>phase</TypeChip>
                <TypeChip onClick={() => setGroupBy(['status'])}>status</TypeChip>
            </TypeWrapper>
            <TableWrapper {...getTableProps()}>
                <div>
                    {headerGroups.map((group) => (
                        <div {...group.getHeaderGroupProps()} key={group.getHeaderGroupProps().key}>
                            {group.headers.map((column) => (
                                <TableHeadCell
                                    {...column.getHeaderProps()}
                                    key={column.getHeaderProps().key}
                                >
                                    {column.render('Header')}
                                </TableHeadCell>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()} key={row.getRowProps().key}>
                                {row.cells.map((cell: any) => {
                                    if (cell.isAggregated) {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {' '}
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
                </div>
                <div>
                    {footerGroups.map((group) => (
                        <FooterRow
                            {...group.getFooterGroupProps()}
                            key={group.getFooterGroupProps().key}
                        >
                            {group.headers.map((column) => (
                                <TableCell
                                    {...column.getFooterProps()}
                                    key={column.getFooterProps().key}
                                >
                                    {column.render('Footer')}
                                </TableCell>
                            ))}
                        </FooterRow>
                    ))}
                </div>
            </TableWrapper>
        </>
    );
}
