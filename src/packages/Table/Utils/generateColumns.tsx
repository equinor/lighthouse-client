import { TableData, Column, ColumnOptions } from '../Types/types';
import {
    generateArrayColumn,
    generateCustomColumn,
    generateObjectColumn,
    generateOthersColumn,
} from './columnGenerators';
import { findCustomColumnWidth, hasCustomCell } from './utils';

export interface HeaderData {
    key: string;
    title: string;
}

export const generateHeaderKeys = <D extends TableData>(
    headerItem: D,
    preventAutoGenerateColumns: boolean,
    options?: ColumnOptions<D>
): Array<Column<D>> => {
    if (!headerItem) return [];
    let totalCustomColumnWidth = 0;
    options?.headers?.map((column) => {
        totalCustomColumnWidth = totalCustomColumnWidth +=
            column.width !== undefined ? column.width : 0;
        return column;
    });
    options?.customColumns?.map((column) => {
        totalCustomColumnWidth = totalCustomColumnWidth +=
            typeof column.width === 'number' ? column.width : 0;
        return column;
    });

    const defaultColumns: Column<D>[] = preventAutoGenerateColumns
        ? []
        : autoGenerateColumns(headerItem, totalCustomColumnWidth, options);

    return options?.customColumns
        ? defaultColumns.concat(options.customColumns as unknown as Column<D>)
        : defaultColumns;
};

const autoGenerateColumns = <T extends TableData>(
    headerItem: T,
    totalCustomColumnWidth: number,
    options?: ColumnOptions<T>
) =>
    Object.keys(headerItem).map((key): Column<T> => {
        const columnsWithCustomWidth = options?.headers?.filter(
            (header) => header?.width !== undefined
        ).length;
        const columnCount =
            Object.keys(headerItem).length +
            (options?.customColumns?.length !== undefined ? options?.customColumns.length : 0) -
            (options?.hiddenColumnsCount !== undefined ? options?.hiddenColumnsCount : 0) -
            (columnsWithCustomWidth !== undefined ? columnsWithCustomWidth : 0) -
            (options?.customColumns?.length !== undefined ? options?.customColumns.length : 0);
        const customWidth = findCustomColumnWidth(key, options?.headers);

        if (hasCustomCell(key, options?.customCellView)) {
            return generateCustomColumn({
                headers: options?.headers,
                key,
                customCellView: options!.customCellView!,
                columnCount: columnCount,
                customWidth: customWidth,
                totalCustomColumnWidth: totalCustomColumnWidth,
            });
        }
        if (Array.isArray(headerItem[key])) {
            return generateArrayColumn({
                headers: options?.headers,
                key,
                columnCount,
                totalCustomColumnWidth,
                customWidth,
            });
        }
        if (headerItem[key] === null) {
            return generateOthersColumn({
                headers: options?.headers,
                key,
                columnCount,
                totalCustomColumnWidth,
                customWidth,
            });
        }
        if (typeof headerItem[key] === 'object') {
            return generateObjectColumn({
                headers: options?.headers,
                key,
                columnCount,
                totalCustomColumnWidth,
                customWidth,
            });
        }

        return generateOthersColumn({
            headers: options?.headers,
            key,
            columnCount,
            totalCustomColumnWidth,
            customWidth,
        });
    });
