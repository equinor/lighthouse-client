import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { FilterData } from '../Types/FilterItem';
import { FilterState } from './FilterContext';

export enum FilterActions {
    setFilterData = 'setFilterData'
}

export const actions = {
    setFilterData: createCustomAction(
        FilterActions.setFilterData,
        (filter: FilterData) => ({
            filter
        })
    )
};

export type Action = ActionType<typeof actions>;

export function filterReducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
        case getType(actions.setFilterData):
            return { ...state, filterData: action.filter };
        default:
            return state;
    }
}
