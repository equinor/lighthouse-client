import { getType } from 'typesafe-actions';
import { Actions, actions } from './ParkViewActions';
/**
 * TODO: any should be ParkViewState<T>, this causes a ripple effect of other typing problems.
 * Leaving at this for now, to get it into a working state.
 **/

export function GardenReducer(state: any, action: Actions) {
    switch (action.type) {
        case getType(actions.setGroupKeys):
            return { ...state, groupByKeys: action.groupKeys };

        case getType(actions.setGardenKey):
            return { ...state, gardenKey: action.gardenKey };

        case getType(actions.setData):
            return { ...state, data: action.data };
        default:
            return state;
    }
}
