import { getType } from 'typesafe-actions';
import { Actions, actions } from './3DActions';
import { ThreeDState } from './3DState';

export default function ThreeDReducer(
    state: ThreeDState,
    action: Actions
): ThreeDState {
    switch (action.type) {
        case getType(actions.setModelData):
            return {
                ...state,
                modelData: action.modelData
            };
        case getType(actions.setThreeDInstance):
            return {
                ...state,
                ...action.instance
            };

        default:
            return state;
    }
}
