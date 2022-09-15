import { FieldSettings } from '../Models/fieldSettings';
import { DataSet, GardenGroups } from '../Models/data';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';
import { PreGroupByFiltering, StatusView } from '../Models/gardenOptions';
import { hasChildKey, isRecordWithKeys } from './utilities';

type GroupByArgs<T extends Record<PropertyKey, unknown>, K extends keyof T> = {
    arr: T[];
    keys: K[];
    status?: StatusView<T>;
    groupDescriptionFunc?: GroupDescriptionFunc<T>;
    fieldSettings?: FieldSettings<T, string>;
    isExpanded?: boolean;
    preGroupFiltering: PreGroupByFiltering<T>;
    customGroupByKeys?: Record<string, unknown>;
    depth: number;
};

const lookupGroup = <T extends Record<PropertyKey, unknown>>(
    acc: GardenGroups<T>,
    valueKey: string
): DataSet<T> | undefined => {
    return acc.find((x) => x.value === valueKey);
};

export function groupBy<T extends Record<PropertyKey, unknown>, K extends keyof T>({
    arr,
    keys,
    customGroupByKeys,
    fieldSettings,
    groupDescriptionFunc = () => '',
    isExpanded,
    preGroupFiltering,
    status,
    depth,
}: GroupByArgs<T, K>): GardenGroups<T> {
    const key = (keys[0] && keys[0].toString()) || undefined;
    if (!key) return [];
    if (!arr || arr.length === 0) return [];

    const fieldSetting = fieldSettings?.[key];

    let gardengroups: GardenGroups<T> = [];

    //Inverse grouping of array
    if (Array.isArray(arr[0][key])) {
        gardengroups = groupByArray({
            arr: arr,
            preGroupFiltering: preGroupFiltering,
            key: key,
            fieldSettings: fieldSettings,
            isExpanded: depth === 0 ? true : isExpanded,
        });
    } else {
        gardengroups = preGroupFiltering(arr, key).reduce((acc, item) => {
            const itemKeys = fieldSetting?.getKey
                ? fieldSetting.getKey(item, fieldSetting?.key || key, customGroupByKeys)
                : item[key];

            const itemKeysArray = Array.isArray(itemKeys) ? itemKeys : [itemKeys];

            itemKeysArray.forEach((valueKey) => {
                if (!valueKey) valueKey = '(Blank)';

                const group = lookupGroup(acc, valueKey);

                if (group) {
                    group.items.push(item);
                    group.count++;
                } else {
                    acc.push({
                        groupKey: key,
                        value: valueKey,
                        count: 1,
                        isExpanded: Boolean(depth === 0 ? true : isExpanded),
                        items: [item],
                        subGroups: [],
                        description: groupDescriptionFunc(item, key),
                        subGroupCount: 0,
                        depth: depth,
                    });
                }
            });

            return acc;
        }, [] as GardenGroups<T>);
    }

    if (keys.length === 0) return gardengroups;

    const nextKeys = keys.slice(1);

    gardengroups.forEach((_, index) => {
        {
            if (status) {
                if (status.statusGroupFunc) {
                    gardengroups[index].status = status.statusGroupFunc(gardengroups[index]);
                } else if (status.shouldAggregate) {
                    let worstStatus = status.statusItemFunc(gardengroups[index].items[0]);

                    gardengroups[index].items.map((x) => {
                        const itemStatus = status.statusItemFunc(x);
                        if (itemStatus.rating < worstStatus.rating) {
                            worstStatus = itemStatus;
                        }
                    });
                    gardengroups[index].status = worstStatus;
                }
            }
        }

        gardengroups[index].subGroups = groupBy({
            arr: gardengroups[index].items,
            keys: nextKeys,
            status: status,
            groupDescriptionFunc: groupDescriptionFunc,
            fieldSettings: fieldSettings,
            isExpanded: isExpanded,
            customGroupByKeys: customGroupByKeys,
            preGroupFiltering: preGroupFiltering,
            depth: gardengroups[index].depth + 1,
        });

        if (nextKeys.length > 0) {
            gardengroups[index].items = [];

            gardengroups[index].subGroupCount = gardengroups[index].subGroups.length;
        }
    });

    return gardengroups;
}

type GroupByArrayArgs<T extends Record<PropertyKey, unknown>> = {
    arr: T[];
    key: keyof T;
    preGroupFiltering: (arr: T[], groupByKey: string) => T[];
    fieldSettings?: FieldSettings<T, string>;
    isExpanded?: boolean;
};

function groupByArray<T extends Record<PropertyKey, unknown>>({
    arr,
    key,
    preGroupFiltering,
    fieldSettings,
    isExpanded,
}: GroupByArrayArgs<T>): GardenGroups<T> {
    const fieldSetting = fieldSettings?.[key];
    const childKey = fieldSetting?.key;

    /** List of all unique identifiers in child array of all arr entries  */
    const groupNames = preGroupFiltering(arr, String(key)).reduce((prev, curr) => {
        let childArray = new Array<unknown>();
        let children = curr[key];
        if (Array.isArray(children)) {
            childArray = children
                .map((nestedObject) =>
                    typeof nestedObject === 'object' ? nestedObject[childKey] : nestedObject
                )
                .filter((v, i, a) => a.indexOf(v) === i);
        }

        return [...prev, ...childArray.filter((identifier) => !prev.includes(identifier))];
    }, [] as unknown[]);

    const groups = groupNames.map((groupName) => {
        const parentsContainingChildren = arr.filter((item) => {
            const childArr = getChildArray(item, key);

            return (
                childArr &&
                childArr
                    .map((child) => {
                        return isRecordWithKeys(child) && hasChildKey(child, childKey)
                            ? child[childKey]
                            : child;
                    })
                    .includes(groupName)
            );
        });

        return {
            groupKey: key,
            isExpanded: Boolean(isExpanded),
            subGroups: [],
            value: String(groupName),
            count: 0,
            items: parentsContainingChildren,
            subGroupCount: 0,
            depth: 0,
        };
    });

    /** Makes a group for the items with an empty array */
    const blanks = arr.filter((item) => {
        const children = item[key];
        return Array.isArray(children) && children.length === 0;
    });

    if (blanks.length > 0) {
        groups.push({
            groupKey: key,
            isExpanded: Boolean(isExpanded),
            subGroups: [],
            count: 0,
            value: '(Blank)',
            items: blanks,
            subGroupCount: 0,
            depth: 0,
        });
    }

    return groups;
}

function getChildArray<T extends Record<PropertyKey, unknown>>(
    item: T,
    key: keyof T
): unknown[] | null {
    const childArr = item[key];
    return Array.isArray(childArr) ? childArr : null;
}
