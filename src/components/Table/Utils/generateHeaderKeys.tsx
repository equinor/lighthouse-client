import styled from 'styled-components';
import { TableData, Column, CustomCell, CustomHeader } from '../types';
import { findCustomHeader, findCustomCell, hasCustomCell, findCellFn, sortFn } from './utils';

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
    headers?: CustomHeader<D>[],
    customCellView?: CustomCell<D>[]
): Array<Column<D>> => {
    if (!headerItem) return [];

    const defaultCols: Column<D>[] = Object.keys(headerItem).map((key): Column<D> => {
        if (hasCustomCell(key, customCellView)) {
            return {
                id: key,
                accessor: (keys) => ({
                    content: keys,
                    currentKey: key,
                    cellFn: findCellFn(customCellView, key),
                }),
                Header: findCustomHeader(key, headers),
                minWidth: 30,
                width: 150,
                maxWidth: 400,
                Cell: findCustomCell(key, customCellView!),
                aggregate: 'count',
                Aggregated: (cell) => {
                    return (
                        <>
                            {key}
                            <Count>({cell.value})</Count>
                        </>
                    );
                },
                //@ts-ignore
                aggregateValue: (leafValues) => {
                    return leafValues.content[key];
                },

                sortType: sortFn(key),
            };
        }
        if (Array.isArray(headerItem[key])) {
            return {
                id: key,
                accessor: (row) => {
                    return (row[key] as Array<unknown>).length;
                },
                Header: findCustomHeader(key, headers),
                minWidth: 30,
                width: 150,
                maxWidth: 400,
                aggregate: 'count',
                Cell: ({ value }) => {
                    return `items(${value})`;
                },
                Aggregated: () => {
                    return null;
                },
            };
        }
        if (typeof headerItem[key] === 'object') {
            return {
                id: key,
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
