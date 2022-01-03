import { Atom, deref, swap } from '@dbeining/react-atom';
import { GlobalState } from '../Types/GlobalState';

export function dispatch(
    globalState: Atom<GlobalState>,
    update: (state: GlobalState) => GlobalState
): void {
    swap(globalState, update);
}

export function readState<S>(globalState: Atom<GlobalState>, read: (state: GlobalState) => S): S {
    const state = deref<GlobalState>(globalState);
    return read(state);
}
