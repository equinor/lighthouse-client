import { Atom, useAtom } from '@dbeining/react-atom';
import { createGlobalSidesheetState } from '../State/actions';
import { SidesheetState } from '../State/sidesheetState';

/**MIN_WIDTH side sheet width */
const MIN_WIDTH = 48;

/**DEFAULT_WIDTH side sheet width */
const DEFAULT_WIDTH = 650;

export const SidesheetCoreContext = createGlobalSidesheetState({
    minWidth: MIN_WIDTH,
    defaultWidth: DEFAULT_WIDTH,
    isMinimized: false,
    width: DEFAULT_WIDTH,
});

export function getSidesheetContext(): Atom<SidesheetState<unknown>> {
    return SidesheetCoreContext;
}

export function useSideSheet(): SidesheetState<any> {
    return useAtom(getSidesheetContext());
}
