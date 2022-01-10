import { Atom, deref, swap } from '@dbeining/react-atom';
import { SidesheetState } from './sidesheetState';

export function dispatch(
    globalState: Atom<SidesheetState<unknown>>,
    update: <T>(state: SidesheetState<T>) => SidesheetState<unknown>
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<SidesheetState<unknown>>,
    read: <T>(state: SidesheetState<T>) => S
): S {
    const state = deref<SidesheetState<unknown>>(globalState);
    return read(state);
}

export function createGlobalSidesheetState(
    defaultState: SidesheetState<unknown>
): Atom<SidesheetState<unknown>> {
    return Atom.of(defaultState);
}
