import { Data, DataSet } from '../../../Models/data';

const getSubGroupCounts = <T extends unknown>(subGroup: DataSet<T>): number => {
    let count = Object.keys(subGroup.subGroups).length;
    /** If subgroup is not expanded - we only want the number of group headers. Don't care about items. */
    if (!subGroup?.isExpanded) {
        count = count;
    } else if (subGroup?.subGroupCount === 0) {
        /** If subgroup is expanded, but it's the last subgroup - we want to count all the items  */
        count += subGroup.count;
    } else {
        const newSubGroupKeys = Object.keys(subGroup?.subGroups);

        for (let newKey of newSubGroupKeys) {
            count += getSubGroupCounts(subGroup.subGroups[newKey]);
        }
    }

    return count;
};
const getGardenRowCountPerColumn = <T extends unknown>(gardenColumn: DataSet<T>) => {
    const subGroupHeaders = Object.keys(gardenColumn.subGroups);
    let count = subGroupHeaders.length;
    for (let subGroupKey of subGroupHeaders) {
        const subGroup = gardenColumn.subGroups?.[subGroupKey];
        count += getSubGroupCounts(subGroup);
    }

    return count;
};
export const getRowCount = <T extends unknown>(garden: Data<T>) => {
    const gardenKeys = Object.keys(garden);
    let count = 0;
    // If garden is not grouped, then all garden items will have subgroupcount equal to zero
    // So we can just check first item and then return.
    const gardenValues = Object.values(garden);
    if (gardenValues[0]?.subGroupCount === 0) {
        return Math.max(...gardenValues.map((gardenItem) => gardenItem.count));
    }

    // If garden is grouped, then we need to count all garden group headers and all items inside
    // the groups that are expanded.
    for (let gardenKey of gardenKeys) {
        const columnCount = getGardenRowCountPerColumn(garden[gardenKey]);

        count = count > columnCount ? count : columnCount;
    }
    return count;
};
