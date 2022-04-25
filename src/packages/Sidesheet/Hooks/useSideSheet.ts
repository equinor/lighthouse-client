import { useAtom } from '@dbeining/react-atom';
import { getSidesheetContext } from '../context/sidesheetContext';
import { SidesheetState } from '../State/sidesheetState';

interface Sidesheet extends SidesheetState<any> {
    isActive: boolean;
}

export function useSideSheet(): Sidesheet {
    const state = useAtom(getSidesheetContext());
    return { ...state, isActive: state.SidesheetComponent ? true : false };
}
