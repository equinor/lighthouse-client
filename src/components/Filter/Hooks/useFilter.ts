import { useContext, useMemo } from 'react';
import { dictToArray } from '../Components/Utils/dictToArray';
import { Context } from '../Context/FilterContext';
import { filter } from '../Services/filter';
import { FilterDataOptions, FilterGroup } from '../Types/FilterItem';

interface FilterContext<T> extends Context {
    filter: FilterGroup[];
    data: T[];
    filteredData: T[];
}

export function useFilter<T>(): FilterContext<T> {
    const state = useContext(Context);
    const data = state.data as T[];
    const options = state.options as FilterDataOptions<T>;

    const filteredData = useMemo(
        () => filter(data, state.filterData, options),
        [data, state.filterData]
    );

    return {
        ...state,
        data,
        filter: dictToArray(state.filterData),
        filteredData
    };
}
