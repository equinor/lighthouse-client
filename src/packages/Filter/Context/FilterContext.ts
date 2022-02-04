import { createContext } from 'react';
import { FilterData, FilterItemCheck, FilterOptions } from '../Types/FilterItem';

export interface Context extends FilterState {
    filterItemCheck: FilterItemCheck;
    setActiveFiltersTypes(filterTypes: string[]): void;
}
export interface FilterState {
    isLoading: boolean;
    data: unknown[];
    filteredData: unknown[];
    filterData: FilterData;
    options?: FilterOptions<unknown>;
    activeFiltersTypes: string[];
}

export const Context = createContext({} as Context);
