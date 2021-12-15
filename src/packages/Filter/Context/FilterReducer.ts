import { getType } from 'typesafe-actions';
import { actions, Actions } from './FilterActions';
import { FilterState } from './FilterContext';

export function filterReducer(state: FilterState, action: Actions): FilterState {
    switch (action.type) {
        case getType(actions.setData):
            return { ...state, data: action.data };
        case getType(actions.setFilter):
            return { ...state, filterData: action.filter };
        case getType(actions.setFilteredData):
            return { ...state, filteredData: action.filteredData };
        case getType(actions.setIsLoading):
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
}
