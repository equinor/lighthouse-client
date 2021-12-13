import { Atom, deref, swap } from '@dbeining/react-atom';
import { DataFactoryState } from './dataFactoryState';

export function dispatch(
    globalState: Atom<DataFactoryState>,
    update: (state: DataFactoryState) => DataFactoryState
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<DataFactoryState>,
    read: (state: DataFactoryState) => S
): S {
    const state = deref<DataFactoryState>(globalState);
    return read(state);
}

export function createGlobalFactoryState(defaultState: DataFactoryState): Atom<DataFactoryState> {
    return Atom.of(defaultState);
}
