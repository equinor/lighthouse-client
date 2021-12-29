import { useEffect, useRef, useState } from 'react';

import { FilterDataOptions, FilterItem } from '../Types/FilterItem';
import { createFilterGroups, createFilterItems } from '../Services/createFilter';
import { filter } from '../Services/filter';
import { updateCount } from '../Utils/updateCount';
import {
    deselectAllButOne,
    filterCheckboxChange,
    selectAllCheckBoxes,
} from '../Utils/checkboxOperations';

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
    isFiltering: boolean;
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
    const benchmarkEnabled = false;
    //const [data, setData] = useState<T[]>(initialData);
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [rejectedData, setRejectedData] = useState<T[]>([]);
    const [filterGroups, setFilterGroups] = useState<string[]>([]);
    const [filterItems, setFilterItems] = useState<Map<string, FilterItem[]>>(new Map());
    const [isFiltering, setIsFiltering] = useState<boolean>(false);

    /**
     * All groups where one or more checkbox is deselected
     */
    const activeFilters = useRef(new Map<string, FilterItem[]>());

    useEffect(() => {
        if (initialData.length > 0) {
            setFilteredData(initialData);
            const filterGroups = createFilterGroups(initialData[0], options?.excludeKeys);
            setFilterGroups(filterGroups);
            const generatedFilterItems = createFilterItems(
                initialData,
                filterGroups,
                options?.groupValue
            );

            setFilterItems(generatedFilterItems);
        }
    }, [initialData, options]);

    const getFilterGroup = (groupName: string) => filterItems.get(groupName);

    /**
     * Resets all filters
     */
    const resetFilters = () => {
        setFilteredData(initialData);
        setRejectedData([]);
        activeFilters.current.clear();
        /**
         * Todo store from initial createFilterItems
         * Capture initialFilteritems from useEffect on mount
         * Potential performance pitfall
         */
        setFilterItems(createFilterItems(initialData, filterGroups, options?.groupValue));
        setIsFiltering(false);
    };

    const updateFilterItems = (filterGroupName: string, filterGroup: FilterItem[]) => {
        const currentFilterItems = filterItems;
        currentFilterItems.set(filterGroupName, filterGroup);

        setFilterItems((prev) => prev.set(filterGroupName, filterGroup));
        return currentFilterItems;
    };

    const recoverOnly = (
        currentFilterItems: Map<string, FilterItem[]>,
        filterGroupName: string
    ) => {
        /**
         * Recover records
         */

        const resolvedRecords = filter(
            rejectedData,
            activeFilters.current,
            options?.groupValue,
            true
        );

        /**
         * FilterItems state is not updated at this point
         * Update count for the records that got resolved
         */
        updateCount(
            resolvedRecords.filteredData,
            setFilterItems,
            currentFilterItems,
            'add',
            filterGroupName
        );
        /**
         * ResolvedRecords.filtered data needs to be removed from rejectedData
         */
        setRejectedData(removeFromRejectedRecords(rejectedData, resolvedRecords.filteredData));

        /**
         * Check here if something goes wrong, maybe use prev??
         */
        setFilteredData([...filteredData, ...resolvedRecords.filteredData]);
    };

    const handleFilterItemClick = (
        filterGroupName: string,
        selfValue: string,
        action: 'label' | 'box' | 'all'
    ) => {
        //Can this happen?
        if (isFiltering) {
            console.error(
                'Cannot start a new filtering operation before the previous one is completed'
            );
            throw new Error('Click cooldown');
        }
        setIsFiltering(true);
        let filterGroup: FilterItem[];

        const oldFilterGroup = filterItems.get(filterGroupName);
        if (!oldFilterGroup) return;

        /**
         * Boxes that changed from unchecked to checked,
         * records that needs to be resolved
         */

        switch (action) {
            case 'all': {
                const selected: FilterItem[] = [];
                //find all previouly deselected boxes in the group and push to selected
                oldFilterGroup.forEach((element) => {
                    if (!element.checked) {
                        selected.push(element);
                    }
                });
                filterGroup = selectAllCheckBoxes(oldFilterGroup);
                const currentFilterItems = updateFilterItems(filterGroupName, filterGroup);

                //Remove filtergroup from activeFilters
                activeFilters.current.delete(filterGroupName);

                /**
                 * Nothing to filter on, just overwrite with initial data
                 */
                if (activeFilters.current.size === 0) {
                    resetFilters();
                    return;
                }

                if (selected.length > 0) {
                    recoverOnly(currentFilterItems, filterGroupName);
                }
                /**
                 * Only resolving of keys, never filter here
                 */

                break;
            }

            case 'box': {
                const selected: FilterItem[] = [];
                //find the box that flipped its state and add to deselected or selected
                oldFilterGroup.forEach((element) => {
                    if (element.value === selfValue) {
                        if (!element.checked) {
                            selected.push(element);
                        }
                    }
                });
                /**
                 * At this point you can check if selected is empty or 1 to determine which action to use
                 */

                filterGroup = filterCheckboxChange(selfValue, oldFilterGroup);
                const currentFilterItems = updateFilterItems(filterGroupName, filterGroup);

                if (filterGroup.every((x) => x.checked)) {
                    /**
                     * Section is no longer active
                     */
                    activeFilters.current.delete(filterGroupName);
                } else {
                    activeFilters.current.set(filterGroupName, filterGroup);
                }

                if (activeFilters.current.size === 0) {
                    resetFilters();
                    return;
                }

                if (selected.length > 0) {
                    recoverOnly(currentFilterItems, filterGroupName);
                } else {
                    /**
                     * Filter and done
                     */
                    const newFilteredData = filter(
                        filteredData,
                        activeFilters.current,
                        options?.groupValue
                    );
                    setFilteredData(newFilteredData.filteredData);
                    setRejectedData((prev) => [...prev, ...newFilteredData.rejectedData]);
                    updateCount(
                        newFilteredData.rejectedData,
                        setFilterItems,
                        currentFilterItems,
                        'subtract',
                        filterGroupName
                    );
                }
                /**
                 * Done, setIsFiltering(false)
                 */
                break;
            }

            case 'label': {
                const selected: FilterItem[] = [];
                const unselected: FilterItem[] = [];
                //if self value was checked add to checked, rest becomes unchecked anyways
                oldFilterGroup.forEach((element) => {
                    if (element.value === selfValue) {
                        if (!element.checked) {
                            selected.push(element);
                        }
                    } else {
                        /**
                         * Everything but self
                         * if anything is added you have to filter
                         */
                        if (element.checked) {
                            unselected.push(element);
                        }
                    }
                });
                /**
                 * Worst case you have to do both, check both selected and unselected array
                 */
                filterGroup = deselectAllButOne(selfValue, oldFilterGroup);
                const currentFilterItems = updateFilterItems(filterGroupName, filterGroup);
                activeFilters.current.set(filterGroupName, filterGroup);

                if (selected.length > 0 && unselected.length > 0) {
                    /**
                     * Recover and filter
                     */
                    const newFilteredData = filter(
                        filteredData,
                        activeFilters.current,
                        options?.groupValue
                    );

                    const resolvedRecords = filter(
                        rejectedData,
                        activeFilters.current,
                        options?.groupValue,
                        true
                    );

                    /**
                     * FilterItems state is not updated at this point
                     */
                    updateCount(
                        resolvedRecords.filteredData,
                        setFilterItems,
                        currentFilterItems,
                        'add',
                        filterGroupName
                    );
                    /**
                     * ResolvedRecords.filtered data needs to be removed from rejectedData
                     */
                    const rejectedDataMinusTheNewlyResolvedRecords = removeFromRejectedRecords(
                        rejectedData,
                        resolvedRecords.filteredData
                    );

                    const mergedFilteredData = [
                        ...newFilteredData.filteredData,
                        ...resolvedRecords.filteredData,
                    ];
                    setFilteredData(mergedFilteredData);

                    setRejectedData([
                        ...rejectedDataMinusTheNewlyResolvedRecords,
                        ...newFilteredData.rejectedData,
                    ]);
                    /**
                     * Filter items state is not updated at this point
                     * Count selected columns
                     * use rejected data to update count for all sections except filtergroupname
                     */
                    updateCount(
                        newFilteredData.rejectedData,
                        setFilterItems,
                        currentFilterItems,
                        'subtract',
                        filterGroupName
                    );
                } else if (selected.length > 0) {
                    /**
                     * Recover only
                     */
                    recoverOnly(currentFilterItems, filterGroupName);
                } else if (unselected.length > 0) {
                    /**
                     * Filter and done
                     */
                    const newFilteredData = filter(
                        filteredData,
                        activeFilters.current,
                        options?.groupValue
                    );
                    setFilteredData(newFilteredData.filteredData);
                    setRejectedData((prev) => [...prev, ...newFilteredData.rejectedData]);
                    updateCount(
                        newFilteredData.rejectedData,
                        setFilterItems,
                        currentFilterItems,
                        'subtract',
                        filterGroupName
                    );
                }

                //update activeFilters
                break;
            }
        }

        setIsFiltering(false);
    };

    const returnFilter: Filter<T> = {
        data: initialData,
        filteredData,
        rejectedData,
        filterGroups,
        handleFilterItemClick,
        getFilterGroup,
        isFiltering,
        filterOptions: options,
    };
    return returnFilter;
};

function removeFromRejectedRecords<T>(rejectedRecords: T[], toBeRemoved: T[]): T[] {
    return rejectedRecords.filter((x) => !toBeRemoved.includes(x));
}
