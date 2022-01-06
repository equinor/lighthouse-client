import { Atom } from '@dbeining/react-atom';
import { createGlobalScrimState } from '../State/actions';
import { SidesheetState } from '../State/sidesheetState';

export const SidesheetCoreContext = createGlobalScrimState({});

export function getSidesheetContext(): Atom<SidesheetState<unknown>> {
    return SidesheetCoreContext;
}
