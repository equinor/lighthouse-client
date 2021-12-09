import styled from 'styled-components';
import { TableData, Column, CustomCell, CustomHeader } from '../types';
import { findCustomHeader, findCustomCell, hasCustomCell } from './utils';

export interface HeaderData {
    key: string;
    title: string;
}

const Count = styled.span`
    font-size: 12px;
    padding-left: 0.5rem;
`;
export const generateHeaderKeys = <D extends TableData>(
    headerItem?: D,
    customColumns?: Column<D>[],
    headers?: CustomHeader[],
    customCellView?: CustomCell[]
): Array<Column<D>> => {
    if (!headerItem) return [];

    const defaultCols: Column<D>[] = Object.keys(headerItem).map((key): Column<D> => {
        if (hasCustomCell(key, customCellView)) {
            return {
                accessor: (keys) => ({ content: keys, currentKey: key }),
                Header: findCustomHeader(key, headers),
                minWidth: 30,
                width: 150,
                maxWidth: 400,
                Cell: findCustomCell(key, customCellView!),
            } as Column<D>;
        }
        if (Array.isArray(headerItem[key])) {
            return {
                accessor: key as keyof D,
                Header: findCustomHeader(key, headers),
                minWidth: 30,
                width: 150,
                maxWidth: 400,
                aggregate: 'count',
                Cell: () => {
                    return `items(${(headerItem[key] as Array<unknown>).length})`;
                },
                Aggregated: () => {
                    return null;
                },
            };
        }
        if (typeof headerItem[key] === 'object') {
            return {
                accessor: key as keyof D,
                Header: findCustomHeader(key, headers),
                aggregate: 'count',
                Cell: () => {
                    return null;
                },
                Aggregated: () => {
                    return null;
                },
            };
        }

        return {
            accessor: key as keyof D,
            Header: findCustomHeader(key, headers),
            minWidth: 30,
            width: 150,
            maxWidth: 400,
            aggregate: 'count',
            Aggregated: (cell) => {
                return (
                    <>
                        {key}
                        <Count>({cell.value})</Count>
                    </>
                );
            },
        };
    });
    return customColumns ? defaultCols.concat(customColumns) : defaultCols;
};
