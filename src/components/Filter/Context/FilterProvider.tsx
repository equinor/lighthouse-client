import { useCallback, useEffect, useReducer } from 'react';
import { checkItem } from '../Services/checkItem';
import { createFilterData } from '../Services/creatFilter';
import { FilterDataOptions, FilterItem, FilterItemCheck } from '../Types/FilterItem';
import { Context, FilterProviderProps, FilterState } from './FilterContext';
import { actions, filterReducer } from './FilterReducer';


export function FilterProvider<T>({ children, initialData, options }: FilterProviderProps<T>): JSX.Element {

    const initialState: FilterState = {
        data: [],
        filterData: {},
        options: options as FilterDataOptions<unknown>
    }
    const [state, dispatch] = useReducer(filterReducer, initialState)
    const { filterData } = state;

    useEffect(() => {
        const filter = createFilterData(initialData, options)
        dispatch(actions.setFilter(filter))
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