import { Atom } from '@dbeining/react-atom';
import { GlobalState } from '../Types/GlobalState';

export function createGlobalState(defaultState: GlobalState): Atom<GlobalState> {
    return Atom.of(defaultState);
}

export const globalState = createGlobalState({});

export function getGlobalState(): Atom<GlobalState> {
    return globalState;
}
