import { useCallback, useEffect, useReducer } from 'react';
import { useLocationKey } from '../Hooks/useLocationKey';
import { checkItem } from '../Services/checkItem';
import { createFilterData } from '../Services/creatFilter';
import { FilterData, FilterDataOptions, FilterItem, FilterItemCheck } from '../Types/FilterItem';
import { objectHasKeys } from '../Utils/objectHasKeys';
import { storage } from '../Utils/storage';
import { Context, FilterProviderProps, FilterState } from './FilterContext';
import { actions, filterReducer } from './FilterReducer';


export function FilterProvider<T>({ children, initialData, options }: FilterProviderProps<T>): JSX.Element {
    const locationKey = useLocationKey();
    const filterLocationKey = `filer-${locationKey}`;

    const initialState: FilterState = {
        data: [],
        filterData: {},
        options: options as FilterDataOptions<unknown>
    }
    const [state, dispatch] = useReducer(filterReducer, initialState)
    const { filterData } = state;

    useEffect(() => {
        const localFilter = storage.getItem<FilterData>(filterLocationKey);
        if (localFilter && typeof localFilter !== "string" && objectHasKeys(localFilter)) {
            dispatch(actions.setFilter(localFilter));
        } else {
            const filter = createFilterData(initialData, options)
            dispatch(actions.setFilter(filter));
            storage.setItem<FilterData>(filterLocationKey, filter)
        }
    }, [initialData])

    useEffect(() => {
        dispatch(actions.setData(initialData))
    }, [initialData])

    const filterItemCheck: FilterItemCheck = useCallback(
        (filterItem: FilterItem | FilterItem[], singleClick?: boolean): void => {
            const filter = checkItem(filterData, filterItem, singleClick);
            dispatch(actions.setFilter(filter));
        }, [filterData]);

    return (
        < Context.Provider value={{ ...state, filterItemCheck }}>
            {children}
        </Context.Provider >
    )

}