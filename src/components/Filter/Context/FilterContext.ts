import { createContext } from 'react';
import {
    FilterData,
    FilterDataOptions,
    FilterItemCheck
} from '../Types/FilterItem';

export interface FilterProviderProps<T> {
    children: React.ReactNode;
    data: T[];
    options?: FilterDataOptions<T>;
}

export interface Context extends FilterState {
    filterItemCheck: FilterItemCheck;
}
export interface FilterState {
    data: unknown[];
    filterData: FilterData;
}

export const Context = createContext({} as Context);
