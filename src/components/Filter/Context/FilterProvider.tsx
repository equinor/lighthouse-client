import { useCallback, useEffect, useReducer } from 'react';
import { useLocationKey } from '../Hooks/useLocationKey';
import { checkItem } from '../Services/checkItem';
import { createFilterData } from '../Services/creatFilter';
import { workerFilter } from '../Services/filterApi';
import { FilterData, FilterDataOptions, FilterItem, FilterItemCheck } from '../Types/FilterItem';
import { objectHasKeys } from '../Utils/objectHasKeys';
import { storage } from '../Utils/storage';
import { actions } from './FilterActions';
import { Context, FilterProviderProps, FilterState } from './FilterContext';
import { filterReducer } from './FilterReducer';

export function FilterProvider<T>({
    children,
    initialData,
    options,
}: FilterProviderProps<T>): JSX.Element {
    const locationKey = useLocationKey();
    const filterLocationKey = `filer-${locationKey}`;

    const initialState: FilterState = {
        isLoading: false,
        data: [],
        filteredData: [],
        filterData: {},
        options: options as FilterDataOptions<unknown>,
    };
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const { filterData } = state;

    const setFilter = useCallback(
        (state, filterData): void => {
            dispatch(actions.setIsLoading(true));
            workerFilter(state, filterData, options as FilterDataOptions<unknown>).then((data) => {
                dispatch(actions.setFilteredData(data));
                dispatch(actions.setIsLoading(false));
            });
        },
        [options]
    );

    useEffect(() => {
        // TODO Extracte denne funsjonaliteten og ta den inn som options for filter.
        const localFilter = {}; //storage.getItem<FilterData>(filterLocationKey);
        if (localFilter && typeof localFilter !== 'string' && objectHasKeys(localFilter)) {
            dispatch(actions.setFilter(localFilter));
            setFilter(initialData, localFilter);
        } else {
            const filter = createFilterData(initialData, options);
            dispatch(actions.setFilter(filter));
            storage.setItem<FilterData>(filterLocationKey, filter);
            setFilter(initialData, filter);
        }
    }, [filterLocationKey, initialData, options, setFilter]);

    useEffect(() => {
        dispatch(actions.setData(initialData));
    }, [initialData]);

    const filterItemCheck: FilterItemCheck = useCallback(
        (filterItem: FilterItem | FilterItem[], singleClick?: boolean): void => {
            const currentFilter = checkItem(filterData, filterItem, singleClick);
            dispatch(actions.setFilter(currentFilter));
            storage.setItem<FilterData>(filterLocationKey, currentFilter);
            setFilter(state.data, filterData);
        },
        [filterData, filterLocationKey, setFilter, state.data]
    );

    return <Context.Provider value={{ ...state, filterItemCheck }}>{children}</Context.Provider>;
}
