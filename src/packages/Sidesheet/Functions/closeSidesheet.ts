import { readState, dispatch } from '../State/actions';
import { getSidesheetContext } from '../context/sidesheetContext';

export function closeSidesheet(): void {
    const isPinned = readState(getSidesheetContext(), (state) => state.isPinned);
    if (!isPinned) {
        dispatch(getSidesheetContext(), () => {
            return {
                SidesheetComponent: undefined,
                props: undefined,
                isPinned: undefined,
            };
        });
    }
}
