import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { FilterData } from '../Types/FilterItem';
import { FilterState } from './FilterContext';

export enum FilterActions {
    setFilteredData = 'setFilteredData',
    setFilter = 'setFilter'
}

export const actions = {
    setFilteredData: createCustomAction(
        FilterActions.setFilteredData,
        (filteredData: unknown[]) => ({
            filteredData
        })
    ),
    setFilter: createCustomAction(
        FilterActions.setFilter,
        (filter: FilterData) => ({
            filter
        })
    )
};

export type Action = ActionType<typeof actions>;

export function filterReducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
        case getType(actions.setFilter):
            return { ...state, filterData: action.filter };
        case getType(actions.setFilteredData):
            return { ...state, filteredData: action.filteredData };
        default:
            return state;
    }
}
