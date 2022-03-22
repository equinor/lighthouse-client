import { DataSet } from '../../../Models/data';

type Temp<T extends unknown> = string | T;
const getSubGroupItems = <T extends unknown>(
    column: DataSet<T>,
    subGroupKey: string,
    includeSubGroupValue = false
): Temp<T>[] => {
    let items: Temp<T>[] = [];
    const subGroup = column.subGroups[subGroupKey];
    //TODO test this
    const isExpanded = subGroup.isExpanded;
    if (includeSubGroupValue) items.push(subGroup.value);
    if (subGroup?.subGroupCount === 0 && isExpanded) {
        items.push(...subGroup.items);
    } else {
        const newSubGroupKeys = Object.keys(subGroup.subGroups);
        for (let newKey of newSubGroupKeys) {
            items.push(...getSubGroupItems(subGroup, newKey, includeSubGroupValue));
        }
    }
    return items;
};

export const getGardenItems = <T extends unknown>(
    column: DataSet<T> | undefined,
    includeSubGroupValue = false
): Temp<T>[] | null => {
    if (!column) {
        return null;
    }
    const columnHasNoItems = column.count === 0 && column.subGroupCount === 0;
    if (columnHasNoItems) return null;
    const columnHasNoSubGroups = column.items.length > 0;
    if (columnHasNoSubGroups) return column.items;
    const mainColumnSubGroupIsExpanded = column.isExpanded;
    if (!mainColumnSubGroupIsExpanded) {
        return [column.value];
    }
    let items: Temp<T>[] = [];
    const subGroupKeys = Object.keys(column.subGroups);

    for (let subKey of subGroupKeys) {
        items.push(...getSubGroupItems(column, subKey, includeSubGroupValue));
    }
    return items;
};
