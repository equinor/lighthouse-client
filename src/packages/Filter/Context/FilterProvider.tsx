import { useCallback, useEffect, useReducer } from 'react';
import { checkItem } from '../Services/checkItem';
import { createFilterData } from '../Services/creatFilter';
import { workerFilter } from '../Services/filterApi';
import { FilterItem, FilterItemCheck, FilterOptions } from '../Types/FilterItem';
import { objectHasKeys } from '../Utils/objectHasKeys';
import { actions } from './FilterActions';
import { Context, FilterProviderProps, FilterState } from './FilterContext';
import { filterReducer } from './FilterReducer';

export function FilterProvider<T>({
    children,
    initialData,
    options,
    persistOptions,
}: FilterProviderProps<T>): JSX.Element {
    const activeFilterTypes =
        options?.initialFilters && options.initialFilters.map((initialFilter) => initialFilter.key);
    const initialState: FilterState = {
        isLoading: false,
        data: [],
        filteredData: [],
        filterData: {},
        options: options as FilterOptions<unknown>,
        activeFiltersTypes: activeFilterTypes ? activeFilterTypes : [],
    };
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const { filterData } = state;

    const setFilter = useCallback(
        (state, filterData): void => {
            dispatch(actions.setIsLoading(true));
            workerFilter(state, filterData, options as FilterOptions<unknown>).then((data) => {
                dispatch(actions.setFilteredData(data));
                dispatch(actions.setIsLoading(false));
            });
        },
        [options]
    );

    const setActiveFiltersTypes = useCallback((filterTypes: string[]): void => {
        dispatch(actions.setActiveFiltersTypes(filterTypes));
    }, []);

    useEffect(() => {
        const localFilter = persistOptions && persistOptions.getFilter();
        if (localFilter && typeof localFilter !== 'string' && objectHasKeys(localFilter)) {
            dispatch(actions.setFilter(localFilter));
            setFilter(initialData, localFilter);
        } else {
            const filter = createFilterData(initialData, options);
            dispatch(actions.setFilter(filter));
            persistOptions && persistOptions.setFilter(filter);
            setFilter(initialData, filter);
        }
    }, [initialData, options, persistOptions, setFilter]);

    useEffect(() => {
        dispatch(actions.setData(initialData));
    }, [initialData]);

    const filterItemCheck: FilterItemCheck = useCallback(
        (filterItem: FilterItem | FilterItem[], singleClick?: boolean): void => {
            const currentFilter = checkItem(filterData, filterItem, singleClick);
            dispatch(actions.setFilter(currentFilter));
            persistOptions && persistOptions.setFilter(currentFilter);
            setFilter(state.data, filterData);
        },
        [filterData, persistOptions, setFilter, state.data]
    );

    return (
        <Context.Provider value={{ ...state, filterItemCheck, setActiveFiltersTypes }}>
            {children}
        </Context.Provider>
    );
}
