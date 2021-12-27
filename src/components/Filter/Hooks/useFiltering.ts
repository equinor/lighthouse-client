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

    const handleFilterItemClick = (
        filterGroupName: string,
        selfValue: string,
        action: 'label' | 'box' | 'all'
    ) => {
        setIsFiltering(true);
        let filterGroup: FilterItem[];

        const oldFilterGroup = filterItems.get(filterGroupName);
        if (!oldFilterGroup) return;

        /**
         * Boxes that changed from unchecked to checked,
         * records that needs to be resolved
         */
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
                activeFilters.current.delete(filterGroupName);
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
                    activeFilters.current.delete(filterGroupName);
                } else {
                    activeFilters.current.set(filterGroupName, filterGroup);
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
                activeFilters.current.set(filterGroupName, filterGroup);
                //update activeFilters
                break;
            }
        }
        const currentFilterItems = filterItems;
        currentFilterItems.set(filterGroupName, filterGroup);

        setFilterItems((prev) => prev.set(filterGroupName, filterGroup));

        /**
         * Nothing to filter on, just overwrite with initial data
         */
        if (activeFilters.current.size === 0) {
            setFilteredData(initialData);
            setRejectedData([]);
            /**
             * Todo store from initial createFilterItems
             * Capture initialFilteritems from useeffect on mount
             */
            setFilterItems(createFilterItems(initialData, filterGroups, options?.groupValue));
            setIsFiltering(false);
            return;
        }

        if (benchmarkEnabled) console.time('Filtering');
        const newFilteredData = filter(filteredData, activeFilters.current, options?.groupValue);
        if (benchmarkEnabled) console.timeEnd('Filtering');
        if (selected.length > 0) {
            if (benchmarkEnabled) console.time('Recovering records');
            const resolvedRecords = filter(
                rejectedData,
                activeFilters.current,
                options?.groupValue
            );

            /**
             * FilterItems state is not updated at this point
             */
            updateCount(resolvedRecords.filteredData, setFilterItems, currentFilterItems, 'add');
            /**
             * ResolvedRecords.filtered data needs to be removed from rejectedData
             */
            setRejectedData(removeFromRejectedRecords(rejectedData, resolvedRecords.filteredData));
            if (benchmarkEnabled) console.timeEnd('Recovering records');
            const mergedFilteredData = [
                ...newFilteredData.filteredData,
                ...resolvedRecords.filteredData,
            ];
            setFilteredData(mergedFilteredData);
        } else {
            setFilteredData(newFilteredData.filteredData);
        }
        setRejectedData((prev) => [...prev, ...newFilteredData.rejectedData]);
        /**
         * Filter items state is not updated at this point
         * Count selected columns
         * use rejected data to update count for all sections except filtergroupname
         */
        updateCount(newFilteredData.rejectedData, setFilterItems, currentFilterItems, 'subtract');

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
