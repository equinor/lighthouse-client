import { useContext } from 'react';
import { Context } from '../Context/FilterContext';
import { FilterGroup } from '../Types/FilterItem';
import { dictToArray } from '../Utils/dictToArray';

interface FilterContext extends Context {
    filter: FilterGroup[];
}

export function useFilter(): FilterContext {
    const state = useContext(Context);
    return { ...state, filter: dictToArray(state.filterData) };
}
