/* The Client context is dependent on a clientState,
 *  and updates to the context is made trough the state.
 */

import { Atom, deref, swap } from '@dbeining/react-atom';
import { GlobalClientState } from '../Types/GlobalClientState';

/** @type {Atom<GlobalClientState>}  Main State in Application*/
const GLOBAL_CLIENT_STATE = createGlobalClientState({} as GlobalClientState);

function createGlobalClientState(initialState: GlobalClientState) {
    return Atom.of(initialState);
}

/**
 * Internal function used for globalClientActions.
 * @return {Atom<GlobalClientState>}
 */
function getGlobalClientState(): Atom<GlobalClientState> {
    return GLOBAL_CLIENT_STATE;
}

/**
 * Internal function used manipulating the globalClientState.
 */
export function updateGlobalClientState(
    update: (state: GlobalClientState) => Partial<GlobalClientState>
): void {
    swap(getGlobalClientState(), (currentState) => ({ ...currentState, ...update(currentState) }));
}

/**
 * Internal function used retrieving the globalClientState.
 * @param {(state: GlobalClientState) => S} read
 * @return {GlobalClientState}  returns GlobalClientState or a specified par of the state.
 */
export function readGlobalClientState<S>(
    read: (state: GlobalClientState) => Readonly<S>
): Readonly<S> {
    const state = deref<GlobalClientState>(getGlobalClientState());
    return read(state);
}
