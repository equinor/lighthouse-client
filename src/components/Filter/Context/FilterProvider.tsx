import { useCallback, useEffect, useReducer, useRef } from 'react';
import { checkItem } from '../Services/checkItem';
import { createFilterData } from '../Services/creatFilterData';
import { FilterItem, FilterItemCheck } from '../Types/FilterItem';
import { Context, FilterProviderProps, FilterState } from './FilterContext';
import { FilterActions, filterReducer } from './FilterReducer';

export function FilterProvider<T>({ children, data, options }: FilterProviderProps<T>): JSX.Element {
    const initial = useRef(true);

    const initialState: FilterState = {
        data,
        filterData: {}
    }
    const [state, dispatch] = useReducer(filterReducer, initialState)

    useEffect(() => {
        if (initial.current) {
            const filter = createFilterData(data, options)
            dispatch({ type: FilterActions.setFilterData, filter })
            initial.current = false;
        }
    }, [data, options])

    const filterItemCheck: FilterItemCheck = useCallback(
        (filterItem: FilterItem, singleClick?: boolean): void => {
            const filter = checkItem(state.filterData, filterItem, singleClick);
            dispatch({ type: FilterActions.setFilterData, filter });
        }, [state]);

    return (
        < Context.Provider value={{ ...state, filterItemCheck }}>
            {children}
        </Context.Provider >
    )

}