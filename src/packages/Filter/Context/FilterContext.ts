import { createContext } from 'react';
import { FilterData, FilterDataOptions, FilterItemCheck } from '../Types/FilterItem';
import { FilterPersistOptions, PersistCustomFilters } from '../Types/PersistFilter';

export interface FilterProviderProps<T> {
    children: React.ReactNode;
    initialData: T[];
    options?: FilterDataOptions<T>;
    persistOptions?: FilterPersistOptions;
    persistCustomOptions?: PersistCustomFilters;
}

export interface Context extends FilterState {
    filterItemCheck: FilterItemCheck;
}
export interface FilterState {
    isLoading: boolean;
    data: unknown[];
    filteredData: unknown[];
    filterData: FilterData;
    options?: FilterDataOptions<unknown>;
}

export const Context = createContext({} as Context);
