import { FilterItem } from '../Types/FilterItem';

/**
 * Handles when you click a checkbox, updates the state.
 * @param selfValue
 * @param filterGroup
 * @returns
 */
export const filterCheckboxChange = (
    selfValue: string,
    filterGroup: FilterItem[]
): FilterItem[] => {
    /**
     * Manipulate the box that was checked/unchecked and leave the rest as is
     */
    const changedItemIndex = filterGroup.findIndex((x) => x.value === selfValue);
    const changedItem = filterGroup[changedItemIndex];
    const newItem = { ...changedItem, checked: !changedItem.checked };

    filterGroup[changedItemIndex] = newItem;

    return filterGroup;
};

/**
 * Handles when you click the label of a checkbox
 * @param selfValue
 * @param filterGroup
 * @returns
 */
export const deselectAllButOne = (selfValue: string, filterGroup: FilterItem[]): FilterItem[] => {
    const newGroup: FilterItem[] = [];

    /**
     * foreach uncheck everything
     * Then check filterItem
     */
    filterGroup.forEach((element) => {
        if (element.value === selfValue) {
            newGroup.push({ ...element, checked: true });
        } else {
            newGroup.push({ ...element, checked: false });
        }
    });
    return newGroup;
};

/**
 * Handles when you press "All" checkbox on a group
 * @param filterGroup
 * @returns
 */
export const selectAllCheckBoxes = (filterGroup: FilterItem[]): FilterItem[] => {
    /**
     * foreach check everything
     */
    const newGroup: FilterItem[] = [];
    filterGroup.forEach((element) => {
        newGroup.push({ ...element, checked: true });
    });

    return newGroup;
};
