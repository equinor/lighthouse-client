import { useContext } from 'react';
import { FilterApiContext } from '../Context/FilterContext';
import { FilterApi } from './useFilterApi';

export function useFilterApiContext(): FilterApi<Record<PropertyKey, unknown>> {
    return useContext(FilterApiContext);
}
