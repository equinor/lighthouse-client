import React from 'react';
import { FilterApi } from '../Hooks/useFilterApi';

export const FilterApiContext = React.createContext({} as FilterApi<unknown>);
