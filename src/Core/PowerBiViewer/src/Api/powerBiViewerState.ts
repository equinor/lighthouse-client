import { Atom, DeepImmutable, deref, swap, useAtom } from '@dbeining/react-atom';
import { CoreViewState, ViewState } from '../Types/State';

export function createGlobalState(defaultState: CoreViewState): Atom<CoreViewState> {
    return Atom.of(defaultState);
}

export const PowerBiViewerCoreContext = createGlobalState({} as CoreViewState);

export function getContext(): Atom<CoreViewState> {
    return PowerBiViewerCoreContext;
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

export function usePowerBiViewer(viewerId: string): DeepImmutable<ViewState> {
    const state = useAtom(PowerBiViewerCoreContext);
    // Todo: check if viewer is registered.
    return state[viewerId];
}
