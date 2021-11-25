
import { Chip } from '@equinor/eds-core-react';
import { useMemo } from 'react';
import { Column, useFlexLayout, useGroupBy, useTable } from 'react-table';
import styled from 'styled-components';
import { useColumns } from './hooks/useColumns';
import { useTableDefaults } from './hooks/useTableDefaults';
import { Table } from './types/table';
import { TableVisualOptions } from './types/tableVisualOptions';


export const TableWrapper = styled.div`
    display: inline-block;
    border-spacing: 0;
`;

export const TableRow = styled.div`
    border-bottom: 1px solid rgba(224, 224, 224, 1);

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
    :last-child {
        border-bottom: 2px solid rgba(224, 224, 224, 1);
    }
   
`;
export const FooterRow = styled.div`
    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

export const TableCell = styled.div`
    padding: 10px 0px 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
`;

export const TableHeadCell = styled.div`
    padding: 10px 0px 0px 10px;
 
    font-size: 0.875rem;
    height: 35px;
    font-weight: 500;
    background-color: rgb(247, 247, 247);
    line-height: 1.5rem;


    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* :last-child {
        border-right: none;
    } */
`;

const TypeChip = styled(Chip)`
    margin: 0.2rem;
`
const TypeWrapper = styled.div`
    display: flex;
`


interface TableVisualProps<T> {
    data: T[]
    options: TableVisualOptions<T>
}

export function TableVisual<T>({ data }: TableVisualProps<T>) {

    const { initialState, defaultColumn } = useTableDefaults("status")

    const columns = useColumns<T>(data[0]) as readonly Column<Record<string, unknown>>[]
    const tableSate = useMemo(() => data as Record<string, unknown>[], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        setGroupBy
    } = useTable<Record<string, unknown>>({
        columns,
        data: tableSate,
        defaultColumn,
        initialState
    },
        useFlexLayout,
        useGroupBy
    ) as Table


    return (
        <>
            <TypeWrapper>
                <TypeChip onClick={() => setGroupBy(["phase"])}>phase</TypeChip>
                <TypeChip onClick={() => setGroupBy(["status"])}>status</TypeChip>
            </TypeWrapper>
            <TableWrapper {...getTableProps()}>
                <div>
                    {headerGroups.map(group => (
                        <div {...group.getHeaderGroupProps()}>
                            {group.headers.map(column => (
                                <TableHeadCell {...column.getHeaderProps()}>{column.render('Header')}</TableHeadCell>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    if (cell.isAggregated) {
                                        return <TableCell {...cell.getCellProps()
                                        } > {cell.render("Aggregated")}</TableCell>
                                    } else {
                                        return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    }
                                })}
                            </TableRow>
                        )
                    })}
                </div>
                <div>
                    {footerGroups.map(group => (
                        <FooterRow {...group.getFooterGroupProps()}>
                            {group.headers.map(column => (
                                <TableCell {...column.getFooterProps()}>{column.render('Footer')}</TableCell>
                            ))}
                        </FooterRow>
                    ))}
                </div>
            </TableWrapper>
        </ >
    )
}



