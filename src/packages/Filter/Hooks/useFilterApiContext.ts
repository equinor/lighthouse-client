import { useContext } from 'react';
import { FilterApiContext, ItemCountContext } from '../Context/FilterContext';
import { FilterApi } from './useFilterApi';
import { FilterItemCounts } from './useFilterItemCounts';

export function useFilterApiContext(): FilterApi<unknown> {
    return useContext(FilterApiContext);
}

export function useItemCountsContext(): FilterItemCounts {
    return useContext(ItemCountContext);
}
