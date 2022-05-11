import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';

export function closeSidesheet(): void {
    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            SidesheetComponent: undefined,
            props: undefined,
        };
    });
}
