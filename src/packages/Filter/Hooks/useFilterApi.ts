import { useEffect, useRef } from 'react';
import { useRefresh } from '../../../components/ParkView/hooks/useRefresh';
import { doesItemPass } from '../functions/filter';
import { generateFilterValues } from '../functions/generateFilterValues';
import { FilterOptions, FilterValueType } from '../Types/FilterItem';
import { filterGroupExists } from '../Utils/filterGroupExists';
import { shouldFilter } from '../Utils/shouldFilter';

export interface FilterProviderProps<T> {
    filterConfiguration: FilterOptions<T>;
    data: T[];
}

export interface FilterGroup {
    name: string;
    values: FilterValueType[];
}

interface FilterApi<T> {
    filterState: FilterState<T>;
    operations: FilterOperations;
}

interface FilterState<T> {
    checkHasActiveFilters: () => boolean;
    getAllFilterValues: () => FilterGroup[];
    getFilterState: () => FilterGroup[];
    getFilteredData: () => T[];
    checkValueIsActive: (groupName: string, value: FilterValueType) => boolean;
}

interface FilterOperations {
    changeFilterItem: ChangeFilterItem;
    filterAndRerender: VoidFunction;
    removeFilterGroup: RemoveFilterGroup;
    setFilterState: SetFilterState;
    destroyFilter: RerenderVoidFunction;
    clearActiveFilters: RerenderVoidFunction;
    reCreateFilterValue: RerenderVoidFunction;
}

export type ValueFormatterFunction<T> = (item: T) => FilterValueType | FilterValueType[];

export interface ValueFormatterFilter<T> {
    name: string;
    valueFormatter: ValueFormatterFunction<T>;
}

type SetFilterState = (newFilterState: FilterGroup[], reRender?: boolean) => void;
type RemoveFilterGroup = (groupName: string, reRender?: boolean) => void;
type VoidFunction = () => void;
type ChangeFilterItem = (
    action: 'Add' | 'Remove',
    groupName: string,
    newValue: FilterValueType
) => void;
type RerenderVoidFunction = (reRender?: boolean) => void;

export function useFilterApi<T>({
    filterConfiguration,
    data,
}: FilterProviderProps<T>): FilterApi<T> {
    const filteredData = useRef<T[]>(data);
    const filterState = useRef<FilterGroup[]>([]);
    const allFilterValues = useRef<FilterGroup[]>(generateFilterValues(filterConfiguration, data));
    const checkHasActiveFilters = () => filterState.current.length > 0;
    const triggerRerender = useRefresh();

    const checkValueIsActive = (groupName: string, value: FilterValueType) =>
        Boolean(filterState.current.find(({ name }) => name === groupName)?.values.includes(value));

    /**
     * INTERNAL FUNCTION
     * Get value formatters for the active filters
     * Returns an array of objects with name and valueformatter
     */
    function getValueFormatters(): ValueFormatterFilter<T>[] {
        return filterConfiguration.filter(({ name }) =>
            filterState.current.map((group) => group.name === name)
        );
    }

    function reCreateFilterValues(reRender?: boolean) {
        allFilterValues.current = generateFilterValues(filterConfiguration, data);
        reRender && triggerRerender();
    }

    /**
     * INTERNAL FUNCTION
     * Unpacks defaultUncheckedValues from config and filters data
     * @returns
     */
    function handleFilterOnMount() {
        if (!shouldFilter(filterConfiguration)) {
            triggerRerender();
            return;
        }
        filterConfiguration.forEach(({ name, defaultUncheckedValues }) => {
            (defaultUncheckedValues ?? []).forEach((value) => {
                changeFilterItem('Add', name, value, true);
            });
        });
        filterAndRerender();
    }

    /**
     * Will filter the data and re-render when finished
     * @returns
     */
    const filterAndRerender = () => filter(data, filterState.current, true);

    /**
     * Add or remove a filter value
     */
    function changeFilterItem(
        action: 'Add' | 'Remove',
        groupName: string,
        newValue: FilterValueType,
        preventFiltering?: boolean
    ) {
        if (filterGroupExists(groupName, filterState.current)) {
            /**
             * Group exists add or remove
             */
            const group = filterState.current.find(({ name }) => name === groupName);
            if (!group) return;
            group.values =
                action === 'Add'
                    ? [...group.values, newValue]
                    : [...group.values.filter((value) => value !== newValue)];
        } else {
            if (action === 'Remove') return;
            /** only add */
            filterState.current.push({ name: groupName, values: [newValue] });
        }
        /**
         * Actually do the filtering
         */
        !preventFiltering && filter(data, filterState.current);
    }

    /**
     * Add or remove all values in a filter group
     */
    function removeFilterGroup(groupName: string, reRender?: boolean) {
        filterState.current = filterState.current.filter(({ name }) => name !== groupName);
        reRender && triggerRerender();
    }

    /**
     * Manually set the filter state
     */
    function setFilterState(newFilterState: FilterGroup[], reRender?: boolean) {
        filterState.current = newFilterState;
        reRender && triggerRerender();
    }

    /**
     * Destroys the filter
     */
    function destroyFilter(reRender?: boolean) {
        filteredData.current = data;
        filterState.current = [];
        allFilterValues.current = [];
        reRender && triggerRerender();
    }

    /** Clears all active filters */
    function clearActiveFilters(reRender?: boolean) {
        filterState.current = [];
        reRender && triggerRerender();
    }

    /**
     *
     * @param data
     * @param state
     */
    function filter(data: T[], state: FilterGroup[], reRender?: boolean): T[] {
        const filtered = data.filter((item) => doesItemPass(item, state, getValueFormatters()));
        /** Filter the data */
        reRender && triggerRerender();
        return filtered;
    }

    /**
     * Will filter data on mount according to configuration parameter
     */
    useEffect(() => {
        handleFilterOnMount();
    }, []);

    return {
        filterState: {
            checkValueIsActive: checkValueIsActive,
            checkHasActiveFilters: checkHasActiveFilters,
            getFilterState: () => filterState.current,
            getFilteredData: () => filteredData.current,
            getAllFilterValues: () => allFilterValues.current,
        },
        operations: {
            changeFilterItem: changeFilterItem,
            clearActiveFilters: clearActiveFilters,
            destroyFilter: destroyFilter,
            filterAndRerender: filterAndRerender,
            removeFilterGroup: removeFilterGroup,
            setFilterState: setFilterState,
            reCreateFilterValue: reCreateFilterValues,
        },
    };
}
