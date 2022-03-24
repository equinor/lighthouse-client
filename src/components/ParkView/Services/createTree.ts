import { GardenGroups } from '../Models/data';
import { groupBy } from '../Utils/groupBy';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';
import { StatusView } from '../Models/gardenOptions';

export type Tree<T> = Record<string, T[]>;

export function createTree<T>(
    dataSet: T[],
    groupingKeys?: (keyof T)[],
    status?: StatusView<T>,
    groupDescriptionFunc?: GroupDescriptionFunc<T>
): GardenGroups<T> {
    const allGroupingKeys: (keyof T)[] = [];

    if (groupingKeys) {
        groupingKeys.map((x) => {
            allGroupingKeys.push(x);
        });
    }

    if (allGroupingKeys.length <= 0) {
        //Wrap in rootGroup
        const rootGroup: GardenGroups<T> = [];

        rootGroup[0] = {
            groupKey: '' as keyof T,
            value: 'Root',
            subGroups: [],
            items: dataSet,
            count: 0,
            subGroupCount: 0,
            isExpanded: false,
        };

        return rootGroup;
    }

    const rootGroup: GardenGroups<T> = [];

    rootGroup[0] = {
        groupKey: '' as keyof T,
        value: 'Root',
        subGroups: groupBy({
            arr: dataSet,
            keys: allGroupingKeys,
            status: status,
            groupDescriptionFunc: groupDescriptionFunc,
            preGroupFiltering: (data) => data,
        }),
        items: [],
        count: 0,
        isExpanded: false,
        subGroupCount: 0,
    };

    return rootGroup;
}
