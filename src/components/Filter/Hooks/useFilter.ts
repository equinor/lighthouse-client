import { useContext } from 'react';
import { Context } from '../Context/FilterContext';
import { Filter } from './useFiltering';

export function useFilter<T>(): Filter<T> {
    const state = useContext(Context);

    return state as Filter<T>;
}
