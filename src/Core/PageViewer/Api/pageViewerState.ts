import { Atom, deref, swap } from '@dbeining/react-atom';
import { CoreViewState } from '../Types/State';

export function createGlobalState(defaultState: CoreViewState): Atom<CoreViewState> {
    return Atom.of(defaultState);
}

export const PageViewerCoreContext = createGlobalState({} as CoreViewState);

export function getContext(): Atom<CoreViewState> {
    return PageViewerCoreContext;
}

export function dispatch(
    globalState: Atom<CoreViewState>,
    update: (state: CoreViewState) => CoreViewState
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<CoreViewState>,
    read: (state: CoreViewState) => S
): S {
    const state = deref<CoreViewState>(globalState);
    return read(state);
}
