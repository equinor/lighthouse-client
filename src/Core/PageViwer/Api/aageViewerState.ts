import { Atom } from '@dbeining/react-atom';
import { ViewState } from '../Types/State';

export function createGlobalState(defaultState: ViewState): Atom<ViewState> {
    return Atom.of(defaultState);
}

export const PageViewerCoreContext = createGlobalState({} as ViewState);

export function getContext(): Atom<ViewState> {
    return PageViewerCoreContext;
}
