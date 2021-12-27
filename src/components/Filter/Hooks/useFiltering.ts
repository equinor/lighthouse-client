import { useEffect, useState } from 'react';

import { FilterDataOptions, FilterItem } from '../Types/FilterItem';
import { createFilterGroups, createFilterItems } from '../Services/creatFilter';
import { filter } from '../Services/filter';

export type HandleFilterItemClick = (
    filterGroupName: string,
    selfValue: string,
    action: 'label' | 'box' | 'all'
) => void;

export interface Filter<T> {
    data: T[];
    filteredData: T[];
    rejectedData: T[];
    filterGroups: string[];
    handleFilterItemClick: HandleFilterItemClick;
    isLoading: boolean;
    onChange: boolean;
    //filterItemLookup: (filterItem: FilterItem) => FilterItem | undefined;
    getFilterGroup: (groupName: string) => FilterItem[] | undefined;
    filterOptions: FilterDataOptions<T> | undefined;
}
/**
 *
 * @param initialData
 * @returns
 */
export const useFiltering = <T>(
    initialData: T[],
    options: FilterDataOptions<T> | undefined
): Filter<T> => {
    //const [data, setData] = useState<T[]>(initialData);
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [rejectedData, setRejectedData] = useState<T[]>([]);
    const [filterGroups, setFilterGroups] = useState<string[]>([]);
    const [filterItems, setFilterItems] = useState<Map<string, FilterItem[]>>(new Map());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [onChange, setOnChange] = useState<boolean>(false);
    /**
     * All groups where one or more checkbox is deselected
     */

    /**
     * Todo change from useState to something mutable
     */
    const [activeFilters, setActiveFilters] = useState<Map<string, FilterItem[]>>(new Map());

    useEffect(() => {
        if (initialData.length > 0) {
            //setData(initialData);
            setFilteredData(initialData);
            console.log('Data changed', initialData.length);

            const filterGroups = createFilterGroups(initialData[0], options?.excludeKeys);
            setFilterGroups(filterGroups);
            const filterItems = createFilterItems(initialData, filterGroups, options?.groupValue);
            setFilterItems(filterItems);
        }
    }, [initialData, options]);

    const getFilterGroup = (groupName: string) => filterItems.get(groupName);

    // const filterItemLookup = (filterItem: FilterItem): FilterItem | undefined => {
    //     return allFilters.get(filterItem.filterGroupName)?.get(filterItem.value);
    // };

    const handleFilterItemClick = (
        filterGroupName: string,
        selfValue: string,
        action: 'label' | 'box' | 'all'
    ) => {
        setIsLoading(true);
        setOnChange((prev) => !prev);
        console.log('Filter clicked');
        let filterGroup: FilterItem[];

        const oldFilterGroup = filterItems.get(filterGroupName);
        if (!oldFilterGroup) return;
        //Boxes that was checked but is now unchecked
        //const deselected: FilterItem[] = [];
        //boxes that changed from unchecked to checked
        //Keys that needs to be resolved
        const selected: FilterItem[] = [];

        switch (action) {
            case 'all': {
                //find all previouly deselected boxes in the group and push to selected
                oldFilterGroup.forEach((element) => {
                    if (!element.checked) {
                        selected.push(element);
                    }
                });
                filterGroup = selectAllCheckBoxes(oldFilterGroup);

                //Remove filtergroup from activeFilters
                activeFilters.delete(filterGroupName);
                break;
            }

            case 'box': {
                //find the box that flipped its state and add to deselected or selected
                oldFilterGroup.forEach((element) => {
                    if (element.value === selfValue) {
                        if (!element.checked) {
                            selected.push(element);
                        }
                    }
                });

                filterGroup = filterCheckboxChange(selfValue, oldFilterGroup);

                if (filterGroup.every((x) => x.checked)) {
                    /**
                     * Section is no longer active
                     */
                    activeFilters.delete(filterGroupName);
                } else {
                    activeFilters.set(filterGroupName, filterGroup);
                }

                //update activefilters
                break;
            }

            case 'label': {
                //if self value was checked add to checked, rest becomes unchecked anyways
                oldFilterGroup.forEach((element) => {
                    if (element.value === selfValue) {
                        if (!element.checked) {
                            selected.push(element);
                        }
                    }
                });

                filterGroup = deselectAllButOne(selfValue, oldFilterGroup);
                activeFilters.set(filterGroupName, filterGroup);
                //update activeFilters
                break;
            }
        }

        setFilterItems((prev) => prev.set(filterGroupName, filterGroup));
        if (activeFilters.size === 0) {
            console.log('No active filters');
            // setFilteredData(data);
            setFilteredData(initialData);
            setRejectedData([]);
            setIsLoading(false);
            return;
        }

        console.time('Filtering');
        const newFilteredData = filter(filteredData, activeFilters, options?.groupValue);
        console.timeEnd('Filtering');
        if (selected.length > 0) {
            console.time('Recovering records');
            const resolvedRecords = filter(rejectedData, activeFilters, options?.groupValue);
            setRejectedData(removeFromRejectedRecords(rejectedData, resolvedRecords.filteredData));
            console.timeEnd('Recovering records');
            const mergedFilteredData = [
                ...newFilteredData.filteredData,
                ...resolvedRecords.filteredData,
            ];
            setFilteredData(mergedFilteredData);
            /**
             * Count selected columns
             * use rejected data to update count for all sections except filtergroupname
             * Should be async function
             */

            /**
             * ResolvedRecords.filtered data needs to be removed from rejectedData
             */

            //setFilteredData([...newFilteredData.filteredData, ...resolvedRecords.filteredData]);
        } else {
            setFilteredData(newFilteredData.filteredData);
        }
        setRejectedData((prev) => [...prev, ...newFilteredData.rejectedData]);
        /**
         * All keys to resolve are now in selected array, activeFilters are also updated
         */

        //maybe add to existing rejectedData???
        //setRejectedData((prev) => [...prev, ...newFilteredData.rejectedData]);
        //console.log(filterGroup);
        /**
         * Should happen after filtering is done
         */
        setIsLoading(false);
    };

    const returnFilter: Filter<T> = {
        data: initialData,
        filteredData,
        rejectedData,
        filterGroups,
        handleFilterItemClick,
        getFilterGroup,
        isLoading,
        onChange,
        filterOptions: options,
    };
    return returnFilter;
};

const filterCheckboxChange = (selfValue: string, filterGroup: FilterItem[]): FilterItem[] => {
    /**
     * Manipulate the box that was checked/unchecked and leave the rest as is
     */
    const changedItemIndex = filterGroup.findIndex((x) => x.value === selfValue);
    const changedItem = filterGroup[changedItemIndex];
    const newItem = { ...changedItem, checked: !changedItem.checked };

    filterGroup[changedItemIndex] = newItem;

    return filterGroup;
};

const deselectAllButOne = (selfValue: string, filterGroup: FilterItem[]): FilterItem[] => {
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

const selectAllCheckBoxes = (filterGroup: FilterItem[]): FilterItem[] => {
    /**
     * foreach check everything
     */
    const newGroup: FilterItem[] = [];
    filterGroup.forEach((element) => {
        newGroup.push({ ...element, checked: true });
    });

    return newGroup;
};

function removeFromRejectedRecords<T>(rejectedRecords: T[], toBeRemoved: T[]): T[] {
    return rejectedRecords.filter((x) => !toBeRemoved.includes(x));
}
