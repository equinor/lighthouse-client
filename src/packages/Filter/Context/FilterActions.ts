import { ActionType, createCustomAction } from 'typesafe-actions';
import { FilterData } from '../Types/FilterItem';

export enum FilterActions {
    setFilteredData = 'setFilteredData',
    setFilter = 'setFilter',
    setData = 'setData',
    setIsLoading = 'setIsLoading',
    setActiveFiltersTypes = 'setActiveFiltersTypes',
}

export const actions = {
    setFilter: createCustomAction(FilterActions.setFilter, (filter: FilterData) => ({
        filter,
    })),
    setData: createCustomAction(FilterActions.setData, (data) => ({
        data,
    })),
    setFilteredData: createCustomAction(FilterActions.setFilteredData, (filteredData) => ({
        filteredData,
    })),
    setIsLoading: createCustomAction(FilterActions.setIsLoading, (isLoading: boolean) => ({
        isLoading,
    })),
    setActiveFiltersTypes: createCustomAction(
        FilterActions.setActiveFiltersTypes,
        (activeFiltersTypes: string[]) => ({
            activeFiltersTypes,
        })
    ),
};

export type Actions = ActionType<typeof actions>;
