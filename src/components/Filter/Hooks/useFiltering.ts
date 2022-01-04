import { useEffect, useRef, useState } from 'react';

import { FilterItem } from '../Types/FilterItem';
import { FilterOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';
import { createFilterGroups, createFilterItems } from '../Services/createFilter';
import { filter } from '../Services/filter';
import { count } from '../Utils/count';
import { mergeArrays } from '../Utils/mergeArrays';
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
    filterOptions: FilterOptions<T> | undefined;
    resetFilters: () => void;
    activeFilters: Map<string, FilterItem[]>;
}
/**
 *
 * @param initialData
 * @returns
 */
export const useFiltering = <T>(
    initialData: T[],
    options: FilterOptions<T> | undefined
): Filter<T> => {
    const benchmarkEnabled = false;
    /**
     * Data that matches the active filters
     */
    const [filteredData, setFilteredData] = useState<T[]>([]);
    /**
     * The data that was removed from the dataset to produce filtered data
     */
    const [rejectedData, setRejectedData] = useState<T[]>([]);
    /**
     * List of string for every filtergroup
     */
    const [filterGroups, setFilterGroups] = useState<string[]>([]);
    const [filterItems, setFilterItems] = useState<Map<string, FilterItem[]>>(new Map());
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    /**
     * Add groupvalues and customfilterFunctions together
     */
    let calculatedValues: Record<string, (item: T) => string>;
    if (options) {
        if (options.groupValue) {
            calculatedValues = options.groupValue;
        }

        options.calculatedFilter &&
            options.calculatedFilter.forEach((x) => {
                calculatedValues[x.uniqueName] = x.groupValue;
            });
    }

    /**
     * All groups where one or more checkbox is deselected
     */
    const activeFilters = useRef(new Map<string, FilterItem[]>());

    useEffect(() => {
        if (initialData.length > 0) {
            setFilteredData(initialData);
            const filterGroups = createFilterGroups(
                initialData[0],
                options?.excludeKeys,
                options?.calculatedFilter?.map((x) => x.uniqueName)
            );
            setFilterGroups(filterGroups);

            const generatedFilterItems = createFilterItems(
                initialData,
                filterGroups,
                calculatedValues
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
         * Capture initialFilterItems from useEffect on mount
         * Potential performance pitfall
         */
        setFilterItems(createFilterItems(initialData, filterGroups, options?.groupValue));
        setIsFiltering(false);
    };

    const updateFilterItems = (filterGroupName: string, filterGroup: FilterItem[]): void =>
        setFilterItems((prev) => prev.set(filterGroupName, filterGroup));

    const recoverOnly = (): T[] => {
        /**
         * Recover records
         */

        const resolvedRecords = filter(rejectedData, activeFilters.current, options?.groupValue);

        setRejectedData(resolvedRecords.rejectedData);

        if (benchmarkEnabled) console.time('merge data');

        const merged = mergeArrays(filteredData, resolvedRecords.filteredData);

        setFilteredData(merged);
        if (benchmarkEnabled) console.timeEnd('merge data');
        return merged;
    };

    const handleFilterItemClick = async (
        filterGroupName: string,
        selfValue: string,
        action: 'label' | 'box' | 'all'
    ) => {
        //Can this happen?
        if (isFiltering) {
            throw new Error(
                'Cannot start a new filtering operation before the previous one is completed'
            );
        }
        setIsFiltering(true);
        let filterGroup: FilterItem[];

        const oldFilterGroup = filterItems.get(filterGroupName);
        if (!oldFilterGroup) return;
        let updatedFilteredData: T[] = [];

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
                updateFilterItems(filterGroupName, filterGroup);

                //Remove filtergroup from activeFilters
                activeFilters.current.delete(filterGroupName);

                /**
                 * Nothing to filter on, just overwrite with initial data
                 */
                if (activeFilters.current.size === 0) {
                    resetFilters();
                    setIsFiltering(false);
                    return;
                }

                if (selected.length > 0) {
                    recoverOnly();
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
                updateFilterItems(filterGroupName, filterGroup);

                /**
                 * Check if all is checked in filtergroup
                 */
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
                    setIsFiltering(false);
                    return;
                }

                if (selected.length > 0) {
                    updatedFilteredData = recoverOnly();
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
                    updatedFilteredData = newFilteredData.filteredData;
                    const mergedRejectedData = mergeArrays(
                        rejectedData,
                        newFilteredData.rejectedData
                    );
                    setRejectedData(mergedRejectedData);
                }
                /**
                 * Done, setIsFiltering(false)
                 */
                break;
            }

            case 'label': {
                let wasItemChecked = false;
                const checkBox = oldFilterGroup.find((x) => x.value === selfValue);
                if (!checkBox) return;

                filterGroup = deselectAllButOne(selfValue, oldFilterGroup);
                updateFilterItems(filterGroupName, filterGroup);
                activeFilters.current.set(filterGroupName, filterGroup);

                if (checkBox.checked) {
                    wasItemChecked = true;
                }

                if (wasItemChecked) {
                    /**
                     * Filter and done
                     */
                    const newFilteredData = filter(
                        filteredData,
                        activeFilters.current,
                        options?.groupValue
                    );
                    setFilteredData(newFilteredData.filteredData);
                    updatedFilteredData = newFilteredData.filteredData;
                    const mergedRejectedData = mergeArrays(
                        rejectedData,
                        newFilteredData.rejectedData
                    );
                    setRejectedData(mergedRejectedData);
                } else {
                    /**
                     * Recover data
                     * Combine newRejectedData and oldFilteredData
                     * set filteredData to recovered data
                     * Either recount all or run both count functions
                     */
                    const resolvedRecords = filter(
                        rejectedData,
                        activeFilters.current,
                        options?.groupValue
                    );

                    /**
                     * Remove from rejectedData first
                     */
                    const combinedRejectedData = mergeArrays(
                        resolvedRecords.rejectedData,
                        filteredData
                    );
                    setRejectedData(combinedRejectedData);

                    setFilteredData(resolvedRecords.filteredData);
                    updatedFilteredData = resolvedRecords.filteredData;
                }

                break;
            }
        }

        const updatedFilterItems = filterItems;

        updatedFilterItems.set(filterGroupName, filterGroup);

        await count(
            updatedFilteredData,
            setFilterItems,
            updatedFilterItems,
            calculatedValues,
            filterGroups
        );
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
        resetFilters,
        activeFilters: activeFilters.current,
    };
    return returnFilter;
};
