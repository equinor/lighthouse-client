import { Atom, deref, swap } from '@dbeining/react-atom';
import { ScrimState } from './ScrimState';

export function dispatch(
    globalState: Atom<ScrimState>,
    update: (state: ScrimState) => ScrimState
): void {
    swap(globalState, update);
}

export function readState<S>(globalState: Atom<ScrimState>, read: (state: ScrimState) => S): S {
    const state = deref<ScrimState>(globalState);
    return read(state);
}

export function createGlobalScrimState(defaultState: ScrimState): Atom<ScrimState> {
    return Atom.of(defaultState);
}
