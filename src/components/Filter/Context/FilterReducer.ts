import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { FilterData } from '../Types/FilterItem';
import { FilterState } from './FilterProvider';

export enum FilterActions {
    setFilterData = 'setFilterData'
}

export const actions = {
    setFilterData: createCustomAction(
        FilterActions.setFilterData,
        (filterData: FilterData) => ({
            filterData
        })
    )
};

export type Action = ActionType<typeof actions>;

export function filterReducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
        case getType(actions.setFilterData):
            return { ...state, filterData: action.filterData };
        default:
            return state;
    }
}
