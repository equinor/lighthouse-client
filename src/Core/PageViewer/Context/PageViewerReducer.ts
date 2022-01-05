import { getType } from 'typesafe-actions';
import { Action } from './PageViewerActions';
import { PageViewerState } from './PageViewerContextProvider';
import { actions } from './PageViewerActions';

export function pageViewerReducer(state: PageViewerState, action: Action): PageViewerState {
    switch (action.type) {
        case getType(actions.setSelectedItem):
            return { ...state };

        default:
            return state;
    }
}
