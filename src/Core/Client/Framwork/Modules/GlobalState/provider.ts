/* eslint-disable react-hooks/rules-of-hooks */
import { useAtom } from '@dbeining/react-atom';
import { Atom, DeepImmutable, deref, swap } from '@libre/atom';
import { GlobalClientState } from '../../../Types/GlobalClientState';

export interface IGlobalStateProvider {
    /**
     * Internal function used manipulating the globalClientState.
     */
    updateGlobalClientState(update: (state: GlobalClientState) => Partial<GlobalClientState>): void;

    /**
     * Internal function used retrieving the globalClientState.
     * @param {(state: GlobalClientState) => S} read
     * @return {GlobalClientState}  returns GlobalClientState or a specified par of the state.
     */
    readGlobalClientState<S>(read: (state: GlobalClientState) => Readonly<S>): Readonly<S>;
}

const CLIENT_STATE_WINDOW_ID = '$CLIENT_ATOM';

declare global {
    interface Window {
        [CLIENT_STATE_WINDOW_ID]: Atom<GlobalClientState>;
    }
}

/**
 * Internal hook used retrieving the globalClientState.
 * @return {DeepImmutable<GlobalClientState>}
 */
export function useGlobalClientState(): DeepImmutable<GlobalClientState> {
    return useAtom(window[CLIENT_STATE_WINDOW_ID]);
}

export class GlobalStateProvider implements IGlobalStateProvider {
    GLOBAL_CLIENT_STATE: Atom<GlobalClientState>;

    constructor(protected _initialState: GlobalClientState) {
        this.GLOBAL_CLIENT_STATE = this.createGlobalClientState(_initialState);
        window[CLIENT_STATE_WINDOW_ID] = this.GLOBAL_CLIENT_STATE;
    }

    private createGlobalClientState(initialState: GlobalClientState) {
        return Atom.of(initialState);
    }

    /**
     * Internal function used for globalClientActions.
     * @return {Atom<GlobalClientState>}
     */
    private getGlobalClientState(): Atom<GlobalClientState> {
        return this.GLOBAL_CLIENT_STATE;
    }

    updateGlobalClientState(
        update: (state: GlobalClientState) => Partial<GlobalClientState>
    ): void {
        swap(this.getGlobalClientState(), (currentState) => ({
            ...currentState,
            ...update(currentState),
        }));
    }

    readGlobalClientState<S>(read: (state: GlobalClientState) => Readonly<S>): Readonly<S> {
        const state = deref<GlobalClientState>(this.getGlobalClientState());
        return read(state);
    }
}
