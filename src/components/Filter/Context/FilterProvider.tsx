import { useCallback, useEffect, useReducer } from 'react';
import { checkItem } from '../Services/checkItem';
import { createFilterData } from '../Services/creatFilterData';
import { filter } from '../Services/filter';
import { FilterItem, FilterItemCheck } from '../Types/FilterItem';
import { Context, FilterProviderProps, FilterState } from './FilterContext';
import { actions, filterReducer } from './FilterReducer';


export function FilterProvider<T>({ children, initialData, options }: FilterProviderProps<T>): JSX.Element {

    const initialState: FilterState = {
        data: initialData,
        filteredData: initialData,
        filterData: {},
    }
    const [state, dispatch] = useReducer(filterReducer, initialState)
    const { filterData, data } = state;

    useEffect(() => {
        const filter = createFilterData(initialData, options)
        dispatch(actions.setFilter(filter))
    }, [])

    useEffect(() => {
        const filteredData = filter(data, filterData)
        dispatch(actions.setFilteredData(filteredData))
    }, [data, filterData])

    const filterItemCheck: FilterItemCheck = useCallback(
        (filterItem: FilterItem, singleClick?: boolean): void => {
            const filter = checkItem(filterData, filterItem, singleClick);
            dispatch(actions.setFilter(filter));
        }, [filterData]);

    return (
        < Context.Provider value={{ ...state, filterItemCheck }}>
            {children}
        </Context.Provider >
    )

}