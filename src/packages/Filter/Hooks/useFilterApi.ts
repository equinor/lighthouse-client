import { useEffect, useRef } from 'react';
import { useRefresh } from '../../../components/ParkView/hooks/useRefresh';
import { doesItemPassFilter } from '../functions/doesItemPass';
import { generateFilterValues } from '../functions/generateFilterValues';
import { searchAcrossFilterGroups } from '../functions/searchAcrossFilterGroups';
import { FilterOptions, FilterValueType } from '../Types/filter';
import { filterGroupExists } from '../Utils/filterGroupExists';
import { shouldFilter } from '../Utils/shouldFilter';

export interface FilterGroup {
    name: string;
    values: FilterValueType[];
}

type SearchDataSet = 'Data' | 'FilteredData';

export interface FilterItemCount {
    /** Item name */
    name: FilterValueType;
    count: number;
}

export interface FilterApi<T> {
    filterState: FilterState<T>;
    operations: FilterOperations;
    filterGroupState: FilterGroupState;
    search: FilterSearch;
}

interface FilterGroupState {
    getGroupValues: GetGroupValuesFunc;
    getInactiveGroupValues: GetGroupValuesFunc;
    checkValueIsInActive: (groupName: string, value: FilterValueType) => boolean;
    getFilterItemCountsForGroup: (groupName: string) => FilterItemCount[];
}

export type GetGroupValuesFunc = (groupName: string) => FilterValueType[];

interface FilterState<T> {
    checkHasActiveFilters: () => boolean;
    getAllFilterGroups: () => FilterGroup[];
    getFilterState: () => FilterGroup[];
    getFilteredData: () => T[];
}

interface FilterSearch {
    search: (
        groupNames: string[],
        searchValue: string,
        searchIn: SearchDataSet,
        preventReRender?: boolean
    ) => void;
    clearSearch: () => void;
}

interface FilterOperations {
    changeFilterItem: ChangeFilterItem;
    filterAndRerender: VoidFunction;
    markAllValuesActive: RemoveFilterGroup;
    setFilterState: SetFilterState;
    destroyFilter: RerenderVoidFunction;
    clearActiveFilters: RerenderVoidFunction;
    reCreateFilterValue: RerenderVoidFunction;
    init: VoidFunction;
}

export type ValueFormatterFunction<T> = (item: T) => FilterValueType | FilterValueType[];

export interface ValueFormatterFilter<T> {
    name: string;
    valueFormatter: ValueFormatterFunction<T>;
}

type SetFilterState = (newFilterState: FilterGroup[], preventReRender?: boolean) => void;
type RemoveFilterGroup = (groupName: string, preventReRender?: boolean) => void;
type VoidFunction = () => void;
type ChangeFilterItem = (
    action: 'MarkInactive' | 'MarkActive',
    groupName: string,
    newValue: FilterValueType,
    preventFiltering?: boolean
) => void;
type RerenderVoidFunction = (preventReRender?: boolean) => void;

export interface FilterProviderProps<T> {
    filterConfiguration: FilterOptions<T>;
    data: T[];
}
export function useFilterApi<T>({
    filterConfiguration,
    data,
}: FilterProviderProps<T>): FilterApi<T> {
    const filteredData = useRef<T[]>(data ?? []);
    const filterState = useRef<FilterGroup[]>([]);
    const allFilterValues = useRef<FilterGroup[]>(generateFilterValues(filterConfiguration, data));
    const checkHasActiveFilters = () => filterState.current.length > 0;
    const triggerRerender = useRefresh();

    const checkValueIsInActive = (groupName: string, value: FilterValueType) =>
        Boolean(filterState.current.find(({ name }) => name === groupName)?.values.includes(value));

    const getGroupValues = (groupName: string) =>
        allFilterValues.current.find(({ name }) => name === groupName)?.values ?? [];

    const getInactiveGroupValues = (groupName: string) =>
        filterState.current.find(({ name }) => name === groupName)?.values ?? [];

    /**
     * @internal
     * Get value formatters for the active filters
     * Returns an array of objects with name and valueformatter
     */
    function getValueFormatters(): ValueFormatterFilter<T>[] {
        return filterConfiguration.filter(({ name }) =>
            getFilterState().map((group) => group.name === name)
        );
    }

    function getFilterItemCountsForGroup(groupName: string): FilterItemCount[] {
        const filterGroup = allFilterValues.current.find(({ name }) => name === groupName);
        if (!filterGroup) return [];

        return filterGroup.values.map(
            (value): FilterItemCount => ({
                name: value,
                count: filteredData.current.filter((item) =>
                    doesItemPassFilter(
                        item,
                        [
                            {
                                name: groupName,
                                values: filterGroup.values.filter((oldValue) => oldValue !== value),
                            },
                        ],
                        getValueFormatters()
                    )
                ).length,
            })
        );
    }

    /**@internal
     *
     */
    const getFilterState = () => filterState.current;
    /**
     * @internal
     */
    function filter(preventReRender?: boolean) {
        if (!data || data.length === 0) return;
        setFilteredData(
            data.filter((item) => doesItemPassFilter(item, getFilterState(), getValueFormatters()))
        );

        handleShouldReRender(preventReRender);
    }

    /**
     * @internal
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
                changeFilterItem('MarkInactive', name, value, true);
            });
        });
        filter();
    }

    /**
     * @internal
     * @param preventReRender
     * @returns
     */
    const handleShouldReRender = (preventReRender?: boolean) =>
        !preventReRender && triggerRerender();

    /**
     * Initializes the filter
     */
    function init() {
        setFilteredData(data);
        setFilterState([], true);
        reCreateFilterValues(true);
        handleFilterOnMount();
    }

    function reCreateFilterValues(preventReRender?: boolean) {
        allFilterValues.current = generateFilterValues(filterConfiguration, data);
        !preventReRender && triggerRerender();
    }

    /** Add or remove a filter value from the blacklist */
    function changeFilterItem(
        action: 'MarkInactive' | 'MarkActive',
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
                action === 'MarkInactive'
                    ? [...group.values, newValue]
                    : [...group.values.filter((value) => value !== newValue)];
        } else {
            if (action === 'MarkActive') return;
            /** only add */
            filterState.current.push({ name: groupName, values: [newValue] });
        }
        /** Actually do the filtering */
        !preventFiltering && filter();
    }

    /**
     * Add or remove all values in a filter group
     */
    function markAllValuesActive(groupName: string, preventReRender?: boolean) {
        handleShouldReRender();
        setFilterState(filterState.current.filter(({ name }) => name !== groupName));
        filter(preventReRender);
    }

    /**
     * Manually set the filter state
     */
    function setFilterState(newFilterState: FilterGroup[], preventReRender?: boolean) {
        filterState.current = newFilterState;
        filter(preventReRender);
    }

    /**
     * Destroys the filter
     */
    function destroyFilter(preventReRender?: boolean) {
        setFilteredData(data);
        setFilterState([], true);
        setAllFilterValues([]);
        handleShouldReRender(preventReRender);
    }

    /** Clears all active filters */
    function clearActiveFilters(preventReRender?: boolean) {
        setFilterState([], true);
        handleShouldReRender(preventReRender);
    }

    /**
     * @internal
     * Set filter values
     * @param newFilterValues
     */
    function setAllFilterValues(newFilterValues: FilterGroup[]) {
        allFilterValues.current = newFilterValues;
    }

    /**
     * @internal
     * Set filter data
     */
    function setFilteredData(newData: T[]) {
        filteredData.current = newData;
    }

    /** Clears the search and filters the data using the current filterstate */
    function clearSearch(): void {
        filter();
    }

    /** Search across multiple filter groups for a value that matches at least one */
    function search(
        groupNames: string[],
        searchValue: string,
        searchIn: SearchDataSet,
        preventReRender?: boolean
    ): void {
        if (groupNames.length === 0) return;

        /** Find value formatters for the groups you want to search across */
        const valueFormatters = getValueFormatters().filter(({ name }) =>
            groupNames.includes(name)
        );

        const haystack = searchIn === 'Data' ? data : filteredData.current;
        const needle = searchValue.toLowerCase();

        setFilteredData(searchAcrossFilterGroups(valueFormatters, haystack, needle));
        handleShouldReRender(preventReRender);
    }

    /**
     * Will filter data on mount according to configuration parameter
     */
    useEffect(() => {
        handleFilterOnMount();
    }, []);

    return {
        filterState: {
            checkHasActiveFilters: checkHasActiveFilters,
            getFilterState: getFilterState,
            getFilteredData: () => filteredData.current,
            getAllFilterGroups: () => allFilterValues.current,
        },
        operations: {
            init: init,
            changeFilterItem: changeFilterItem,
            clearActiveFilters: clearActiveFilters,
            destroyFilter: destroyFilter,
            filterAndRerender: filter,
            markAllValuesActive: markAllValuesActive,
            setFilterState: setFilterState,
            reCreateFilterValue: reCreateFilterValues,
        },
        filterGroupState: {
            getFilterItemCountsForGroup: getFilterItemCountsForGroup,
            getInactiveGroupValues: getInactiveGroupValues,
            getGroupValues: getGroupValues,
            checkValueIsInActive: checkValueIsInActive,
        },
        search: {
            clearSearch: clearSearch,
            search: search,
        },
    };
}
