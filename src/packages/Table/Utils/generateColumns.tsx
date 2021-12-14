import { TableData, Column, ColumnOptions } from '../types';
import {
    generateArrayColumn,
    generateCustomColumn,
    generateObjectColumn,
    generateOthersColumn,
} from './columnGenerators';
import { hasCustomCell } from './utils';

export interface HeaderData {
    key: string;
    title: string;
}

export const generateHeaderKeys = <D extends TableData>(
    headerItem: D,
    options?: ColumnOptions<D>
): Array<Column<D>> => {
    if (!headerItem) return [];

    const defaultColumns: Column<D>[] = Object.keys(headerItem).map((key): Column<D> => {
        if (hasCustomCell(key, options?.customCellView)) {
            return generateCustomColumn({
                headers: options?.headers,
                key,
                customCellView: options!.customCellView!,
            });
        }
        if (Array.isArray(headerItem[key])) {
            return generateArrayColumn({ headers: options?.headers, key });
        }
        if (typeof headerItem[key] === 'object') {
            return generateObjectColumn({ headers: options?.headers, key });
        }

        return generateOthersColumn({ headers: options?.headers, key });
    });

    return options?.customColumns
        ? defaultColumns.concat(options.customColumns as unknown as Column<D>)
        : defaultColumns;
};
