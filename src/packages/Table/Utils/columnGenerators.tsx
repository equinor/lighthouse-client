import styled from 'styled-components';
import { Column, CustomCell, CustomHeader, TableData } from '../types';
import { findCellFn, findCustomCell, findCustomHeader, sortFn } from './utils';

const Count = styled.span`
    font-size: 12px;
    padding-left: 0.5rem;
`;
export type GenerateColumnArgs<D extends TableData> = {
    key: string;
    headers: CustomHeader<D>[] | undefined;
};

export type GenerateCustomColumnArgs<D extends TableData> = GenerateColumnArgs<D> & {
    customCellView: CustomCell<D>[];
};

export const generateCustomColumn = <D extends TableData>(
    args: GenerateCustomColumnArgs<D>
): Column<D> => {
    const { key, headers, customCellView } = args;
    return {
        id: key,
        accessor: (keys) => ({
            content: keys,
            currentKey: key,
            cellAttributeFn: findCellFn(customCellView, key),
        }),
        Header: findCustomHeader(key, headers),
        minWidth: 30,
        width: 150,
        maxWidth: 400,
        Cell: findCustomCell(key, customCellView),
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
};

export const generateArrayColumn = <D extends TableData>(
    args: GenerateColumnArgs<D>
): Column<D> => {
    const { headers, key } = args;
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
};

export const generateObjectColumn = <D extends TableData>(
    args: GenerateColumnArgs<D>
): Column<D> => {
    const { key, headers } = args;
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
};

export const generateOthersColumn = <D extends TableData>(args: GenerateColumnArgs<D>) => {
    const { key, headers } = args;
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
};
