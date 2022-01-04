import { FilterItem } from '../Types/FilterItem';
export function count<T>(
    data: T[],
    setFilterItems: React.Dispatch<React.SetStateAction<Map<string, FilterItem[]>>>,
    filterItems: Map<string, FilterItem[]>,
    calculatedValues: Record<string, (item: T) => string>,
    filterGroups: string[]
): void {
    if (data.length <= 0) return;

    filterGroups.map((key) => {
        const clearCountGroup: FilterItem[] = [];

        const group = filterItems.get(key);
        if (!group) return;
        group.forEach((x) => {
            clearCountGroup.push({ ...x, count: 0 });
        });
        filterItems.set(key, clearCountGroup);

        const filterSection = filterItems.get(key);
        if (!filterSection) return;
        data.forEach((element) => {
            let objectIndex;
            if (calculatedValues[key]) {
                objectIndex = filterSection.findIndex(
                    (x) => x.value === calculatedValues[key](element)
                );
            } else {
                objectIndex = filterSection.findIndex((x) => x.value === element[key]);
            }

            if (objectIndex === -1) return;
            let object = filterSection[objectIndex];
            if (!object) return;
            if (object.checked) {
                object = { ...object, count: object.count + 1 };
            }

            filterSection[objectIndex] = object;
        });
        filterItems.set(key, filterSection);
    });

    setFilterItems(filterItems);
}
