import { FieldSettings } from '../Models/FieldSettings';

import { Data } from '../Models/data';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';
import { groupBy } from '../Utils/groupBy';
import { StatusView } from '../Models/gardenOptions';

export type Garden<T> = Record<string, T[]>;

export function createGarden<T>(
    dataSet: T[],
    gardenKey: keyof T,
    groupingKeys?: (keyof T)[],
    status?: StatusView<T>,
    groupDescriptionFunc?: GroupDescriptionFunc<T>,
    fieldSettings?: FieldSettings<T, string>
): Data<T> {
    const allGroupingKeys: (keyof T)[] = [gardenKey];
    if (groupingKeys) {
        groupingKeys.map((x) => {
            allGroupingKeys.push(x);
        });
    }

    const groupedData = groupBy(
        dataSet,
        allGroupingKeys,
        status,
        groupDescriptionFunc,
        fieldSettings
    );

    return groupedData;
}
