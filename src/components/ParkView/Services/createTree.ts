import { StatusView } from '../Context/ParkViewContext';
import { Data } from '../Models/data';
import { groupBy } from '../Utils/groupBy';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';

export type Tree<T> = Record<string, T[]>;

export function createTree<T>(
    dataSet: T[],
    groupingKeys?: (keyof T)[],
    status?: StatusView<T>,
    groupDescriptionFunc?: GroupDescriptionFunc<T>
): Data<T> {
    const allGroupingKeys: (keyof T)[] = [];

    if (groupingKeys) {
        groupingKeys.map((x) => {
            allGroupingKeys.push(x);
        });
    }

    if (allGroupingKeys.length <= 0) {
        //Wrap in rootGroup
        const rootGroup: Data<T> = {};

        rootGroup[0] = {
            groupKey: '' as keyof T,
            value: 'Root',
            subGroups: {},
            items: dataSet,
            count: 0,
            isExpanded: false,
        };

        return rootGroup;
    }

    const rootGroup: Data<T> = {};

    rootGroup[0] = {
        groupKey: '' as keyof T,
        value: 'Root',
        subGroups: groupBy(dataSet, allGroupingKeys, status, groupDescriptionFunc),
        items: [],
        count: 0,
        isExpanded: false,
    };

    return rootGroup;
}
