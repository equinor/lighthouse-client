import { useContext, useMemo } from 'react';
import { dictToArray } from '../Components/Utils/dictToArray';
import { Context } from '../Context/FilterContext';
import { FilterGroup } from '../Types/FilterItem';

interface FilterContext<T> extends Context {
    filter: FilterGroup[];
    data: T[];
    filteredData: T[];
}

export function useFilter<T>(): FilterContext<T> {
    const state = useContext(Context);
    const data = useMemo(() => state.data as T[], [state.data]);
    const filteredData = useMemo(() => state.filteredData as T[], [state.filteredData]);
    // const options = useMemo(
    //     () => state.options as FilterDataOptions<T>,
    //     [state.options]
    // );

    // const filteredData = useMemo(
    //     () => filter(data, state.filterData, options),
    //     [data, state.filterData]
    // );

    const context = useMemo(
        () => ({
            ...state,
            data,
            filter: dictToArray(state.filterData),
            filteredData,
        }),
        [state, data, filteredData]
    );

    return context;
}
