import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { FilterData } from '../Types/FilterItem';
import { FilterState } from './FilterContext';

export enum FilterActions {
    setFilteredData = 'setFilteredData',
    setFilter = 'setFilter',
    setData = 'setData'
}

export const actions = {
    setFilter: createCustomAction(
        FilterActions.setFilter,
        (filter: FilterData) => ({
            filter
        })
    ),
    setData: createCustomAction(FilterActions.setData, (data) => ({
        data
    }))
};

export type Action = ActionType<typeof actions>;

export function filterReducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
        case getType(actions.setData):
            return { ...state, data: action.data };
        case getType(actions.setFilter):
            return { ...state, filterData: action.filter };
        default:
            return state;
    }
}
