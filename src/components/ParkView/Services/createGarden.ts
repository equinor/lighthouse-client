import { FieldSettings } from '../Models/fieldSettings';

import { GardenGroups } from '../Models/data';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';
import { groupBy } from '../Utils/groupBy';
import { PostGroupBySorting, PreGroupByFiltering, StatusView } from '../Models/gardenOptions';

export type Garden<T> = Record<string, T[]>;

interface CreateGardenArgs<T> {
    dataSet: T[];
    gardenKey: keyof T;
    groupingKeys?: (keyof T)[];
    status?: StatusView<T>;
    groupDescriptionFunc?: GroupDescriptionFunc<T>;
    fieldSettings?: FieldSettings<T, string>;
    customGroupByKeys?: Record<string, unknown>;
    preGroupFiltering?: PreGroupByFiltering<T>;
    postGroupBySorting?: PostGroupBySorting<T>;
    isExpanded?: boolean;
}

export function createGarden<T>({
    dataSet,
    gardenKey,
    customGroupByKeys,
    fieldSettings,
    groupDescriptionFunc = () => '',
    groupingKeys,
    postGroupBySorting = (data) => data,
    preGroupFiltering = (data) => data,
    status,
    isExpanded,
}: CreateGardenArgs<T>): GardenGroups<T> {
    const allGroupingKeys: (keyof T)[] = [gardenKey];
    if (groupingKeys) {
        groupingKeys.map((x) => {
            allGroupingKeys.push(x);
        });
    }

    const groupedData = groupBy({
        arr: dataSet,
        keys: allGroupingKeys,
        status: status,
        groupDescriptionFunc: groupDescriptionFunc,
        fieldSettings: fieldSettings,
        isExpanded: isExpanded,
        customGroupByKeys: customGroupByKeys,
        preGroupFiltering: preGroupFiltering,
    });

    return postGroupBySorting(groupedData, groupingKeys || []);
}
