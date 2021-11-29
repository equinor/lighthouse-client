import { getType } from 'typesafe-actions';
import { Actions, actions } from './ParkViewActions';
import { ParkViewState } from './ParkViewContext';

export function GardenReducer(state: ParkViewState, action: Actions): ParkViewState {
    switch (action.type) {
        case getType(actions.setGroupKeys):
            return { ...state, groupByKeys: action.groupKeys };

        case getType(actions.setGardenKey):
            return { ...state, gardenKey: action.gardenKey };

        case getType(actions.setExcludeKeys):
            return { ...state, excludeKeys: action.excludeKeys };

        case getType(actions.setData):
            return { ...state, data: action.data };
        default:
            return state;
    }
}
