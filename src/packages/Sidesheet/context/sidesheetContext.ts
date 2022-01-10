import { Atom } from '@dbeining/react-atom';
import { createGlobalSidesheetState } from '../State/actions';
import { SidesheetState } from '../State/sidesheetState';

export const SidesheetCoreContext = createGlobalSidesheetState({});

export function getSidesheetContext(): Atom<SidesheetState<unknown>> {
    return SidesheetCoreContext;
}
