import { Atom, deref, swap } from '@dbeining/react-atom';
import { DialogState } from './dialogState';

export function dispatch(
    globalState: Atom<DialogState>,
    update: (state: DialogState) => DialogState
): void {
    swap(globalState, update);
}

export function readState<S>(globalState: Atom<DialogState>, read: (state: DialogState) => S): S {
    const state = deref<DialogState>(globalState);
    return read(state);
}

export function createGlobalDialogState(defaultState: DialogState): Atom<DialogState> {
    return Atom.of(defaultState);
}
