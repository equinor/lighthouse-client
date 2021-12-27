import { FilterItem } from '../Types/FilterItem';
/**
 * Updates the count for every value it encounters
 * subtracts for items removed from the dataset
 * adds for items added to the dataset
 * @param data
 * @param setFilterItems
 * @param filterItems
 * @param action
 * @returns void
 */
export function updateCount<T>(
    data: T[],
    setFilterItems: React.Dispatch<React.SetStateAction<Map<string, FilterItem[]>>>,
    filterItems: Map<string, FilterItem[]>,
    action: 'add' | 'subtract'
): void {
    if (data.length <= 0) return;
    Object.keys(data[0]).forEach((key) => {
        data.forEach((element) => {
            const filterSection = filterItems.get(key);
            if (!filterSection) return;
            const objectIndex = filterSection.findIndex((x) => x.value === element[key]);
            if (objectIndex === -1) return;
            let object = filterSection[objectIndex];
            if (!object) return;
            if (action === 'add') {
                object = { ...object, count: object.count + 1 };
            } else {
                object = { ...object, count: object.count - 1 };
            }

            filterSection[objectIndex] = object;
            filterItems.set(key, filterSection);
        });
    });
    setFilterItems(filterItems);
}
