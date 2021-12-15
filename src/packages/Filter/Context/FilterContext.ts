import { createContext } from 'react';
import { FilterData, FilterItemCheck, FilterOptions } from '../Types/FilterItem';
import { FilterPersistOptions, PersistCustomFilters } from '../Types/PersistFilter';

export interface FilterProviderProps<T> {
    children: React.ReactNode;
    initialData: T[];
    options?: FilterOptions<T>;
    persistOptions?: FilterPersistOptions;
    persistCustomOptions?: PersistCustomFilters;
}

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
