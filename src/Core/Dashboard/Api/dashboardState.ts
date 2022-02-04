import { Atom, deref, swap } from '@dbeining/react-atom';
import { DashboardState } from '../Types/State';

export function createGlobalState(defaultState: DashboardState): Atom<DashboardState> {
    return Atom.of(defaultState);
}

export const DashboardCoreContext = createGlobalState({} as DashboardState);

export function getDashboardContext(): Atom<DashboardState> {
    return DashboardCoreContext;
}

export function dispatch(
    globalState: Atom<DashboardState>,
    update: (state: DashboardState) => DashboardState
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<DashboardState>,
    read: (state: DashboardState) => S
): S {
    const state = deref<DashboardState>(globalState);
    return read(state);
}
