import { useAtom } from '@dbeining/react-atom';
import { getSidesheetContext } from '../context/sidesheetContext';
import { SidesheetState } from '../State/sidesheetState';

interface Sidesheet extends SidesheetState<any> {
    isActive: boolean;
    activeWidth: number;
}

export function useSideSheet(): Sidesheet {
    const state = useAtom(getSidesheetContext());
    const isActive = state.SidesheetComponent ? true : false;
    const activeWidth = isActive ? (state.isMinimized ? state.minWidth : state.width) : 0;
    return { ...state, isActive, activeWidth };
}
