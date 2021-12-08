import styled from 'styled-components';
import { TableData, Column, CustomColumn } from '../types';

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
    customColumns?: CustomColumn<D>[]
): Array<Column<D>> => {
    if (!headerItem) return [];

    const defaultCols = Object.keys(headerItem).map((key): Column<D> => {
        if (Array.isArray(headerItem[key])) {
            return {
                accessor: key as keyof D,
                Header: key,
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
                Header: key,
                aggregate: 'count',
                Cell: () => {
                    return null;
                },
                Aggregated: () => {
                    return null;
                },
            };
        }
        //use Date.parse to check if valid date
        if (typeof headerItem[key] === 'string' && Date.parse(headerItem[key] as string) > 0) {
            return {
                accessor: key as keyof D,
                Header: key,
                Cell: () => {
                    return <div>{new Date(headerItem[key] as Date).toLocaleDateString()}</div>;
                },
            };
        }

        return {
            accessor: key as keyof D,
            Header: key,
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
    return customColumns ? defaultCols.concat(customColumns as Column<D>[]) : defaultCols;
};
