/* The Client context is dependent on a clientState,
 *  and updates to the context is made trough the state.
 */

import { Atom, DeepImmutable, deref, swap, useAtom } from '@dbeining/react-atom';
import { GlobalClientState } from '../Types/GlobalClientState';

/* Initial Global state used for setting panel states and logging sate to false */
const INITIAL_STATE = {
    settings: {
        appsPanelActive: false,
        fullscreenMenuActive: false,
        logging: false,
        isProduction: false,
        clientEnv: 'dev',
    },
} as GlobalClientState;

/** @type {Atom<GlobalClientState>}  Main State in Application*/
const GLOBAL_CLIENT_STATE = createGlobalClientState(INITIAL_STATE);

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
 * Internal hook used retrieving the globalClientState.
 * @return {DeepImmutable<GlobalClientState>}
 */
export function useGlobalClientState(): DeepImmutable<GlobalClientState> {
    return useAtom(getGlobalClientState());
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
