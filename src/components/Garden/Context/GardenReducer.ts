import { getType } from 'typesafe-actions';
import { Actions, actions } from './GardenActions';
import { GardenState } from './GardenContext';

export function GardenReducer<T>(state: GardenState<T>, action: Actions): GardenState<T> {
    switch (action.type) {
        case getType(actions.setGroupKeys):
            return { ...state, groupKeys: action.groupKeys };

        case getType(actions.setGroupeKey):
            return { ...state, groupeKey: action.groupeKey };

        case getType(actions.setExcludeKeys):
            return { ...state, excludeKeys: action.excludeKeys };
        default:
            return state;
    }
}
