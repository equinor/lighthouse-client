import { Atom, deref, swap } from '@dbeining/react-atom';
import { DataViewState } from './DataViewState';

export function dispatch(
    globalState: Atom<DataViewState>,
    update: (state: DataViewState) => DataViewState
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<DataViewState>,
    read: (state: DataViewState) => S
): S {
    const state = deref<DataViewState>(globalState);
    return read(state);
}
