import { createContext } from 'react';
import { FilterApi } from '../Hooks/useFilterApi';

export const FilterApiContext = createContext({} as FilterApi<Record<PropertyKey, unknown>>);
