import { DateCell, DescriptionCell, StatusCell } from '../Components/cells';
import { CustomCell, CustomHeader, TableData } from '../types';

// export function getRowHeight(index: number): number {}

export const findCustomHeader = <T extends TableData>(
    key: keyof T,
    headers?: CustomHeader[]
): string | keyof T => {
    if (headers === undefined || headers.length === 0) return key;

    const customHeader = headers.findIndex((header) => header.key === key);

    if (customHeader > -1) {
        return headers[customHeader].title;
    } else return key;
};

export const findCustomCell = <T extends TableData>(key: keyof T, customCellView: CustomCell[]) => {
    const customCell = customCellView.findIndex((cell) => cell.key === key);
    if (customCell > -1) {
        switch (customCellView[customCell].type) {
            case 'Date':
                return DateCell;
            case 'Description':
                return DescriptionCell;
            case 'Status':
                return StatusCell;
            default:
                break;
        }
    } else return null;
};

export const hasCustomCell = <T extends TableData = TableData>(
    key: keyof T,
    customCells?: CustomCell[]
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
