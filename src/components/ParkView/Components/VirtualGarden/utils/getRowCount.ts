import { GardenGroups, DataSet } from '../../../Models/data';

const getSubGroupCounts = <T extends unknown>(subGroup: DataSet<T>): number => {
    let count = subGroup.subGroups.length;
    /** If subgroup is not expanded - we only want the number of group headers. Don't care about items. */
    if (!subGroup?.isExpanded) {
        count = count;
    } else if (subGroup?.subGroupCount === 0) {
        /** If subgroup is expanded, but it's the last subgroup - we want to count all the items  */
        count += subGroup.count;
    } else {
        subGroup.subGroups.forEach((_a, i) => {
            count += getSubGroupCounts(subGroup.subGroups[i]);
        });
    }

    return count;
};
const getGardenRowCountPerColumn = <T extends unknown>(gardenColumn: DataSet<T>) => {
    let count = gardenColumn.subGroups.length;
    gardenColumn.subGroups.forEach((_a, i) => {
        const subGroup = gardenColumn.subGroups[i];
        count += getSubGroupCounts(subGroup);
    });

    return count;
};
export const getRowCount = <T extends unknown>(garden: GardenGroups<T>) => {
    let count = 0;
    // If garden is not grouped, then all garden items will have subgroupcount equal to zero
    // So we can just check first item and then return.
    if (garden[0]?.subGroupCount === 0) {
        return Math.max(...garden.map((gardenItem) => gardenItem.count));
    }

    // If garden is grouped, then we need to count all garden group headers and all items inside
    // the groups that are expanded.
    garden.forEach((_a, i) => {
        const columnCount = getGardenRowCountPerColumn(garden[i]);

        count = count > columnCount ? count : columnCount;
    });
    return count;
};
