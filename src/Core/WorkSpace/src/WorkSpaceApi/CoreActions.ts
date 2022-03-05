import { Atom, deref, swap } from '@dbeining/react-atom';
import { WorkSpaceState } from './workspaceState';

export function dispatch(
    globalState: Atom<WorkSpaceState>,
    update: (state: WorkSpaceState) => WorkSpaceState
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<WorkSpaceState>,
    read: (state: WorkSpaceState) => S
): S {
    const state = deref<WorkSpaceState>(globalState);
    return read(state);
}
