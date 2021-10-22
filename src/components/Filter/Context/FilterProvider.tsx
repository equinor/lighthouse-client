import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { createFilterData } from '../Services/creatFilterData';
import { FilterData, FilterDataOptions } from '../Types/FilterItem';
import { FilterActions, filterReducer } from './FilterReducer';


interface FilterProviderProps<T, K extends keyof T> {
    children: React.ReactNode;
    data: T[],
    options?: FilterDataOptions<T, K>
}

export interface FilterContext extends FilterState {
    dispatch: React.Dispatch<{
        type: FilterActions.setFilterData;
        filterData: FilterData;
    }>
}


export interface FilterState {
    data: unknown[];
    filterData: FilterData;
}



const Context = createContext({} as FilterContext)

export function useFilterContext(): FilterContext {
    return useContext(Context)
}



export const FilterProvider = <T, K extends keyof T>({ children, data, options }: FilterProviderProps<T, K>): JSX.Element => {
    const initial = useRef(true);

    const initialState: FilterState = {
        data,
        filterData: {}
    }
    const [state, dispatch] = useReducer(filterReducer, initialState)

    useEffect(() => {
        if (initial.current) {
            const filterData = createFilterData(data, options)
            dispatch({ type: FilterActions.setFilterData, filterData })
            initial.current = false;
        }
    }, [options, data])

    return (
        < Context.Provider value={{ ...state, dispatch }
        }>
            {children}
        </Context.Provider >
    )

}