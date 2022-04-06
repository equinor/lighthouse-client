import React from 'react';
import { FilterApi } from '../Hooks/useFilterApi';
import { FilterItemCounts } from '../Hooks/useFilterItemCounts';

export const FilterApiContext = React.createContext({} as FilterApi<unknown>);

export const ItemCountContext = React.createContext({} as FilterItemCounts);
