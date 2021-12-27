import { createContext } from 'react';
import { Filter } from '../Hooks/useFiltering';
import { FilterDataOptions } from '../Types/FilterItem';

export interface FilterProviderProps<T> {
    children: React.ReactNode;
    initialData: T[];
    options?: FilterDataOptions<T>;
}

export interface Context extends Filter<unknown> { }

export const Context = createContext({} as Context);
