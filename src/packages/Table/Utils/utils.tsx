import { Row, SortByFn } from 'react-table';
import { DateCell, DescriptionCell, StatusCell } from '../Components/Cells';
import { CellType, CustomCell, CustomCellType, CustomHeader, TableData } from '../types';

export const findCustomHeader = <T extends TableData>(
    key: keyof T,
    headers?: CustomHeader<T>[]
): string | keyof T => {
    if (headers === undefined || headers.length === 0) return key;

    const customHeaderIndex = headers.findIndex((header) => header.key === key);

    if (customHeaderIndex > -1) {
        return headers[customHeaderIndex].title;
    } else return key;
};

const isCustomCell = <T, D extends TableData>(arg: CellType<T>): arg is CustomCellType<T, D> => {
    return (arg as CustomCellType<T, D>).Cell !== undefined;
};

/**
 * Function to find the correct cell type if there are any.
 * @returns Predefined cell components or custom cell component for the column containing keyof T.
 */
export const findCustomCell = <T extends TableData>(
    key: keyof T,
    customCellView: CustomCell<T>[]
) => {
    const customCellIndex = customCellView.findIndex((cell) => cell.key === key);
    if (customCellIndex > -1) {
        const customCellType = customCellView[customCellIndex].type;
        if (isCustomCell(customCellType)) {
            return customCellType.Cell;
        }
        switch (customCellType) {
            case 'Date':
                return DateCell;
            case 'Description':
                return DescriptionCell;
            case 'Status':
                return StatusCell;
            default:
                return 'Incorrect cell type given';
        }
    } else return 'Oops';
};

export const hasCustomCell = <T extends TableData = TableData>(
    key: keyof T,
    customCells?: CustomCell<T>[]
): boolean => {
    if (
        customCells !== undefined &&
        customCells.length !== 0 &&
        customCells.findIndex((cell) => cell.key === key) > -1
    ) {
        return true;
    }
    return false;
};

export const findCellFn = <T extends TableData>(
    customCellView: CustomCell<T>[] | undefined,
    key: keyof T
) => {
    if (customCellView) {
        const currentIndex = customCellView.findIndex((c) => c.key === key);

        if (
            currentIndex !== undefined &&
            currentIndex > -1 &&
            customCellView[currentIndex].cellAttributeFn
        ) {
            return customCellView[currentIndex].cellAttributeFn;
        } else {
            return undefined;
        }
    } else return undefined;
};

/** Custom sort function because default sort uses what the accessor returns.
 * In the case of when the accessor returns a complex object (it should return primitive(!)),
 * we need to handle the sorting logic.
 */
export const sortFn =
    <T extends TableData>(key: string): SortByFn<T> =>
    (objA, objB, id, _desc) => {
        const a = objA.values[id].content[key];
        const b = objB.values[id].content[key];
        return a === b ? 0 : a > b ? 1 : -1;
    };

/**
 * Pass this to `options={{groupByFn}}` in Table if you need to group columns with complex objects.
 * If the values property is not a primitive, the grouping will not work
 * as expected. Since the accessor in some cases returns complex objects
 * (which will be put in the values property) we need to access a primitive value
 * in order to group correctly.
 */
export const defaultGroupByFn = (rows: Row<TableData>[], columnId: string) => {
    return rows.reduce((prev, row, _i) => {
        // TODO investigate if content[columnId] (original value) is good enough
        const resKey =
            typeof row.values[columnId] === 'object' && row.values[columnId] !== null
                ? `${row.values[columnId].content[columnId]}`
                : `${row.values[columnId]}`;
        prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
        prev[resKey].push(row);
        return prev;
    }, {});
};
