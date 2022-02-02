import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch, readState } from '../State/actions';

export function closeSidesheet(): void {
    const isPinned = readState(getSidesheetContext(), (state) => state.isPinned);
    if (!isPinned) {
        dispatch(getSidesheetContext(), (state) => {
            return {
                ...state,
                SidesheetComponent: undefined,
                props: undefined,
                isPinned: undefined,
            };
        });
    }
}
