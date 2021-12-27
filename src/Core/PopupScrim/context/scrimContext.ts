import { Atom } from '@dbeining/react-atom';
import { createGlobalScrimState } from '../State/actions';
import { ScrimState } from '../State/ScrimState';

export const ScrimCoreContext = createGlobalScrimState({ ScrimContent: undefined });

export function getScrimContext(): Atom<ScrimState> {
    return ScrimCoreContext;
}
